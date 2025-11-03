import { getCourse } from "./courseSystem.js";
export const CourseInformation = {
  videosURL: "assets/video/dataStructure/",
  courseVideos: [ // key: courseid, value: array of videos URL --- But since no backend i will temporary set all courses to view same vids as an array
    ["Arrays.mkv", "Chapter 1: Arrays in Data Structure"],
    ["BackTracking.mkv", "Chapter 2: Backtracking Algorithm"],
    ["Heap.mkv", "Chapter 3: Heap Sort"],
    ["Pointers.mkv", "Chapter 4: Pointers"],
    ["Stack.mkv", "Chapter 5: What is a Stack?"]
  ], 

  /*
    Returns: id: String
  */
  getIdFromURL(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    return id;
  },

  /* Returns 
    {
      category: string, 
      description: string, 
      enrolled: number, 
      id: number, 
      instructor: string, 
      status: string,
      students: array,
      tags: array,
      title: string
    }
  */
  courseInfo(){
    const id = Number(this.getIdFromURL());
    const course = getCourse(id);
    console.log(id);
    return course;
  }
}