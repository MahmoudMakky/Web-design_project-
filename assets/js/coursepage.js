// Modules
import { CourseInformation } from "./Modules/CourseInformation.js";
import { getUser } from "./Modules/userSystem.js";
import { getCurrentUser } from "./Modules/userSystem.js";
import { CourseFeedback } from "./Modules/CourseFeedback.js";

// References
const videoName = document.querySelector("h2.course-title");
const courseTitle = document.querySelector("h4.course-title");
const video = document.querySelector("#video-player");
const rating = document.querySelector(".rating"); // Message to Tony -- Handle this with courseFeedback System
const comments = document.querySelector(".comment-list"); // Message to Tony -- Handle this with courseFeedback System
const submit = document.querySelector("#postComment");
const links = document.querySelectorAll(".course-sidebar a");

// Functions
function getCourseData(){
  return CourseInformation.courseInfo();
}

function submitComment(comment){
  let information = getCourseData();
  CourseFeedback.addFeedback(information.id, getCurrentUser().id.toString(), comment, 0) ? alert("Commented Sucessfully!") : alert("Failed.")
  console.log(information)
  loadComments(getCourseData());
}

function loadComments(course){

  if (comments) {
    comments.innerHTML = '';
  }

  course.feedback.forEach((c) => {
    let x = getUser(c.userId);
    try{
      if(c.comment !== undefined && c.comment !== null){
        const newComment = document.createElement('p')
        newComment.innerHTML = `<strong>${x.name}:</strong> ${c.comment}`;
        comments.appendChild(newComment)
      }
    }catch(e){
      console.log(e);
    }
  });
}

function loadVideo(index){
  let information = getCourseData();
  videoName.innerHTML = `${information.title}`
  courseTitle.innerHTML = `${CourseInformation.courseVideos[index][1]}`;
  video.querySelector("source").src = `${CourseInformation.videosURL}${CourseInformation.courseVideos[index][0]}`;
  video.load();
}

// Events
links.forEach((link, i) => {
  link.addEventListener("click", () => {
    links.forEach(l => l.removeAttribute("id"));
    link.id = "selected";
    loadVideo(i);
  });
});

submit.addEventListener("click" ,(e) => {
  e.preventDefault()
  let comment = document.querySelector("#commentInfo").value;
  submitComment(comment);
});


try{
  loadVideo(0);
  loadComments(getCourseData());
  links[0].id = "selected";
}catch{
  window.location.href="errorpage.html"
}