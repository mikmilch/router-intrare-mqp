import { encouragements } from './Encouragement.js';

export class User {
    constructor( ){
        this.currentQuestion = 0;
        this.answers = Array(42);
    }

    nextQuestion(){
        this.currentQuestion++;
    }

    previousQuestion(){
        this.currentQuestion--;
    }

    addAnswer(index, answer){
        this.answers[index] = answer;
    }

    getAnswers(){
        return this.answers;
    }

    getAnswer(index){
        if (index < 0 || index >= this.answers.length){
            return null;
        }
        return this.answers[index];
    }

    getEncouragement(index){
        let encouragement = null;
        encouragements.forEach((e) => {
            if (index === e.id){
                encouragement = e.message;
            }
        });
        return encouragement;
    }
}