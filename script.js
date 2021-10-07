var Movies = ["Parasite", "1917", "Inception","Intersteller","Joker","DeadPool", "Titanic","Goodfellas"];
var Movie;
var score = 0;
var user;
var s;
var highest_scorer = "";
var count = 0;
var AnsArr = [];
const maxGuesses = 9;

function Start() {
    user = prompt("Hello! Please provide your name to continue -")
    
    for(var i=0; i<user.length; i++){
        if (isAlpha(user[i]) == false && user[i] != " "){
            alert("please provide valid name which does not contain any special characters.")
            Start()
        }
    }
    if (user != null) {
    document.getElementById("user_name").innerHTML =
    "Hello " + user ;
    }
    else{
        Start()
    }   
    
    Movie = Movies[Math.floor(Math.random() *  Movies.length)];	
    Movie = Movie.toUpperCase()
    var rand_index = Math.floor(Math.random() * (Movie.length-1));
    for (var i = 0; i < Movie.length; i++) {
        if (i == rand_index){
            AnsArr[i] = Movie.charAt(i);
        }
        else if (Movie.charAt(i) == " "){
            AnsArr[i] = "";
        }
        else {
            AnsArr[i] = "_";
        }

}
s = AnsArr.join(" ");
document.getElementById("answer").innerHTML = s;
}

function initial_check(){
    var x = document.getElementById("ask").value;
    if (x.toLowerCase() == 'y'){
        document.getElementById("permission").style.display = 'none'
        document.getElementById("game").style.display = 'block'
        Start()
    }				
    else{
        document.getElementById("permission").style.display = 'none'
        quit()
    }
}

function isAlpha(letter){
    code = letter.charCodeAt();
    if (!(code > 47 && code < 58) && // numeric (0-9)
    !(code > 64 && code < 91) && // upper alpha (A-Z)
    !(code > 96 && code < 123)) { // lower alpha (a-z)
    return false;
    }
    else{
        return true;
    }
}

function Letter(){
    
    var letter = document.getElementById("letter").value;
    letter = letter.toUpperCase()
    if (letter.length != 1){
        alert("I can only accept one letter at a time.")
    }
    else if(isAlpha(letter) == false){
        alert("Please enter only valid(AlphaNumeric) letters.")
    }
    
    if (!(Movie.includes(letter)) || !(isAlpha(letter))){
        count ++;
        document.getElementById("comment").innerHTML = "Sorry. You got it wrong. Try again.";
    }

    else {
        document.getElementById("comment").innerHTML = "Great. You found a character. Find the remaining characters!";
    }
    
    if (letter.length == 1 && isAlpha(letter)){
        for (var i = 0; i < Movie.length; i++) {
            if (Movie[i] == letter){
                AnsArr[i] = letter;
            }
        }
    }
    

    document.getElementById("counter").innerHTML ="No of Guesses left: "+ (maxGuesses - count);
    document.getElementById("answer").innerHTML =AnsArr.join(" ");
    
    if (AnsArr.join("") == Movie) {
        score = (maxGuesses - count + AnsArr.length);
        document.getElementById("comment").innerHTML = "Cool! You win! The Movie I chose was " + Movie;
        document.getElementById("score").innerHTML = "Your Score is " + score;
        document.getElementById("Prev_scores").style.display = 'block';
        result()
    }
    
        
    if (count>(8)){
        score = 0;
        document.getElementById("stat").innerHTML="Max tries reached";
        document.getElementById("Over").innerHTML="Game Over.\n Please click on reset button to play again";
        document.getElementById("game").style.display = 'none';
        document.getElementById("reset").style.display = 'block';
        document.getElementById("Prev_scores").style.display = 'block';
        result()

    }
}

function playAgain(){
    document.getElementById("play_again").innerHTML ="To play again, please click the Restart Button";
    document.getElementById("game").style.display = 'none';
    document.getElementById("reset").style.display = 'block';
    document.getElementById("Prev_scores").style.display = 'block';

}
function quit(){
    document.getElementById("quit").innerHTML ="You have exited the game";
    playAgain()
    
}

function result(){

    console.log(user);
    console.log(score);
    console.log(highest_scorer)
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://cs50-assignment-default-rtdb.firebaseio.com/" + user + ".json", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(
        score
    ));


    document.getElementById("game").style.display = 'none';
    playAgain()	
};

function get_data(){

    const xhr = new XMLHttpRequest();
    xhr.open('GET', "https://cs50-assignment-default-rtdb.firebaseio.com/.json", true);
    xhr.send(null);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            
            const data = JSON.parse(xhr.response);
            if (user in data){
                score = score + data[user]

            }

            let max = 0;
            let maxKey = "";
            
            for(let char in data){
              if(data[char]> max){
                max = data[char];
                maxKey= char
              }
            }
            console.log(user)
            if (maxKey == user){
                console.log(user)
                document.getElementById("Major Class").style.display = 'none';
                document.getElementById("highest").style.display = 'block';
            }

            str = JSON.stringify(data, null, 4); 
            document.getElementById("Major Class").style.display = 'none';
            document.getElementById("leaderboard").innerHTML = str
            console.log(maxKey)
            console.log(highest_scorer)

            }
        }
    };

   