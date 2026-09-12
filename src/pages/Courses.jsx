import { useDispatch, useSelector } from "react-redux";

import {
  courseAdded,
  courseUpdated,
  courseRemoved,
} from "../store/CourseSlice";

import { couresSelectors } from "../store/CourseSlice";

function Courses() {
  const dispatch = useDispatch();

  const courses = useSelector(couresSelectors.selectAll);

  const handleAddCourse = () => {
    dispatch(
      courseAdded({
        id: 1,
        title: "JavaScript",
        teacher: "Kamal",
      })
    );
  };

  const handleUpdateCourse = () => {
    dispatch(
      courseUpdated({
        id: 1,
        changes: {
          title: "Advanced JavaScript",
        },
      })
    );
  };

  const handleRemoveCourse = () => {
    dispatch(courseRemoved(1));
  };

  return (
    <div>
      <button onClick={handleAddCourse}>
        Add Course
      </button>

      <button onClick={handleUpdateCourse}>
        Update Course
      </button>

      <button onClick={handleRemoveCourse}>
        Delete Course
      </button>

      <h2>Courses</h2>

      {courses.map((course) => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          <p>Teacher: {course.teacher}</p>
        </div>
      ))}
    </div>
  );
}

export default Courses;