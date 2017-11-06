import {User} from "../models/user";
import {ExerciceRepository} from "../repository/exercice_repository";
import {Injectable, Injector} from "@angular/core";
import {UserRepository} from "../repository/user_repository";
import {Exercice} from "../models/exercice";
import {Question} from "../models/question";
import {Note} from "../models/note";
import {Utils} from "./utils";
import {NoteRepository} from "../repository/note_repository";

@Injectable()
export class ExerciceGenerator {

  private user: User;

  constructor(injector: Injector,
              private userRepository: UserRepository = injector.get(UserRepository),
              private exerciceRepository: ExerciceRepository = injector.get(ExerciceRepository),
              private noteRepository: NoteRepository = injector.get(NoteRepository)
  ) {

    let _this = this;

    this.userRepository.getUser().then(function(user) {
      _this.user = user;
    })

  }

  newExercice(typeId: number, difficulty :number = 0.5): Promise<Exercice> {
    let _this = this;

    return new Promise(function(resolve, reject) {

      _this.exerciceRepository.getExerciceType(typeId).then(function(type) {

        resolve(new Exercice([], new Date().getTime(), type,_this.reverse(_this.user.level,difficulty)))
      }, (error) => reject(error));
    });
  }

  newQuestion(exercice: Exercice): Promise<Question> {
    let _this = this;

    let rank = exercice.rank;

    let properties = this.getQuestionProperties(rank);
    let range = properties[0];
    let nbChoix = properties[1];

    // Begin generate exercice

    return new Promise((resolve, reject) => {

      (() : Promise<Array<Note>> => {
        // Generating good array of notes
        if (exercice.type.id == 0) {

          return _this.generateInterval(range)

        } else if (exercice.type.id == 1) {

          let minor : boolean = Utils.generateRandomInteger(0,10)%2 == 1;

          return _this.generateNote();
        }
      })().then((notes) => {

        resolve(new Question(nbChoix, range, notes[0], notes, false));

      }, (error) => reject(error));

    })

  }

  getQuestionProperties(rank: number): Array<number> {
    let nbChoix : number = 0;
    let range : number = 0;

    // Select the good properties with the exercice rank

    let randRange = 5;

    if (rank < 100) randRange = 2;
    else if (rank < 300) randRange = 3;
    else if (rank < 500) randRange = 4;
    else if (rank < 700) randRange = 5;
    else if (rank < 900) randRange = 6;

    nbChoix = Utils.generateRandomInteger(2, rank / 100 + 2);
    range = Utils.generateRandomInteger(rank / 100 + 1, rank / 100 + randRange);

    if (nbChoix > 8) nbChoix = 8;
    if (range > 15) nbChoix = 15;

    return [range, nbChoix];
  }

  generateChord(minor: boolean): Promise<Array<Note>> {
    let firstNoteP = Utils.generateRandomInteger(1, 64 - 7);
    let secondNoteP = minor ? firstNoteP + 3 : firstNoteP + 4;
    let thirdNoteP = firstNoteP + 7;
    let repo = this.noteRepository;

    return new Promise(function(resolve, reject) {
      repo.getNotesByPosition([firstNoteP, secondNoteP, thirdNoteP]).then(function(notes : Array<Note>) {
        resolve(notes);
      }, (error) => reject(error));
    });
  }

  generateNote() {
    let firstNoteP = Utils.generateRandomInteger(1, 64 - 7);
    let repo = this.noteRepository;

    return new Promise(function(resolve,reject) {
      repo.getNotesByPosition([firstNoteP]).then(function(notes) {
        if (!notes) reject("No note with this position: "+ firstNoteP);
        resolve(notes)
      }, (error) => reject(error))
    })
  }

  generateInterval(range: number, fixed : boolean = false, interval: number = 0): Promise<Array<Note>> {
    let firstNoteP = Utils.generateRandomInteger(1+range, 64-range);

    var secondNoteP: number;

    while(!secondNoteP || secondNoteP == firstNoteP) {
      secondNoteP = Utils.generateRandomInteger(firstNoteP - range, firstNoteP + range);
    }

    if (fixed && interval != 0) {
      interval = interval < 0 ? 0 : interval;
      interval = interval > 9 ? 9 : interval;

      secondNoteP = firstNoteP + interval;
    }

    let repo = this.noteRepository;

    return new Promise(function(resolve, reject) {
      repo.getNotesByPosition([firstNoteP, secondNoteP]).then(function(notes : Array<Note>) {

        resolve(notes);
      }, (error) => reject(error));
    });
  }

  answers(type: number, range: number, notes: Array<Note>, nbAnswers: number): Promise<Array<Note>> {
    let goodP : number;
    console.log("type: "+type);

    switch(type) {
      case 0: goodP = notes[1].position; break;
      case 1: goodP = notes[0].position; break;
    }

    let positions = [goodP];

    for (let i=0; i<nbAnswers; i++) {
      var falseP = 0;
      var isContaining = true;

      // Protect for doublons
      while (falseP == 0 || isContaining) {
        falseP = Utils.generateRandomInteger(goodP-range, goodP+range);

        if (positions.indexOf(falseP)) {
          isContaining = false;
        }
        console.log(!positions.indexOf(falseP), falseP)
      }

      console.debug("pushed", falseP);
      positions.push(falseP);
    }

    return this.noteRepository.getNotesByPosition(positions);
  }

  reverse(userLevel : number ,level : number) {
     return (userLevel * Math.log(10) + 400 * Math.log(-(level-1)/level))/Math.log(10)
   }

}
