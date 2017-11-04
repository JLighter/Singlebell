import {User} from "../models/user";
import {ExerciceRepository} from "../repository/exercice_repository";
import {Component, Injector} from "@angular/core";
import {UserRepository} from "../repository/user_repository";
import {Exercice} from "../models/exercice";
import {ExerciceType} from "../models/exercice_type";
import {Question} from "../models/question";
import {Note} from "../models/note";
import {Utils} from "./utils";
import {NoteRepository} from "../repository/note_repository";
import {Injectable} from "@angular/core";


@Injectable()
export class ExerciceGenerator {

  public user: User;
  public userRepository: UserRepository;
  public noteRepository: NoteRepository;
  public exerciceRepository: ExerciceRepository;

  constructor(injector: Injector) {

    this.exerciceRepository = injector.get(ExerciceRepository);
    this.noteRepository = injector.get(NoteRepository);
    this.userRepository = injector.get(UserRepository);

    let _this = this;

    this.userRepository.getUser().then(function(user) {
      _this.user = user;
    })
  }

  newExercice(type: ExerciceType) {
    let _this = this;
    return new Exercice([], new Date().getTime(), type,_this.user.level)
  }

  newQuestion(exercice: Exercice) {
    let _this = this;
    let nbChoix : number = 0;
    let range   : number = 0;

    new Promise((resolve, reject) => {

      (() : Promise<Array<Note>> => {
        // Generating good array of notes
        if (exercice.type.id == 0) {

            console.log(_this.generateInterval(range));
          return _this.generateInterval(range)

        } else {

          let minor : boolean = Utils.generateRandomInteger(0,1) == 1;

          return _this.generateChord(minor);
        }
      })().then((notes) => {

        return new Question(nbChoix, range, notes[0], notes, false);

      }, (error) => reject(error));

    })

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

  generateInterval(range: number): Promise<Array<Note>> {
    let firstNoteP = Utils.generateRandomInteger(1, 64-range);
    console.log(firstNoteP);
    let secondNoteP = Utils.generateRandomInteger(firstNoteP-range, firstNoteP+range);
    console.log(secondNoteP);

    let repo = this.noteRepository;

    return new Promise(function(resolve, reject) {
      repo.getNotesByPosition([firstNoteP, secondNoteP]).then(function(notes : Array<Note>) {
        console.log(notes);
        resolve(notes);
      }, (error) => reject(error));
    });
  }

  falseAnswers(type: number, range: number, notes: Array<Note>, nbAnswers: number): Promise<Array<Note>> {
    let goodP : number;

    switch(type) {
      case 0: goodP = notes[1].position; break;
      case 1: goodP = notes[0].position; break;
    }

    let positions = [goodP];

    for (let i=0; i<nbAnswers; i++) {
      let falseP = Utils.generateRandomInteger(goodP-range, goodP+range);
      positions.push(falseP);
    }

    return this.noteRepository.getNotesByPosition(positions);
  }

}
