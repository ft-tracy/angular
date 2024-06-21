// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-create-quiz',
//   templateUrl: './create-quiz.component.html',
//   styleUrl: './create-quiz.component.scss'
// })
// export class CreateQuizComponent {

// }


import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  createQuizForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createQuizForm = this.fb.group({
      question: ['', Validators.required],
      answers: this.fb.array([this.createAnswer()]),
      correctAnswer: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  get answers(): FormArray {
    return this.createQuizForm.get('answers') as FormArray;
  }

  createAnswer(): FormGroup {
    return this.fb.group({
      answer: ['', Validators.required]
    });
  }

  addAnswer(): void {
    this.answers.push(this.createAnswer());
  }

  removeAnswer(index: number): void {
    if (this.answers.length > 1) {
      this.answers.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.createQuizForm.valid) {
      const quizData = this.createQuizForm.value;
      console.log(quizData);
      // Send quizData to the backend
    }
  }
}


