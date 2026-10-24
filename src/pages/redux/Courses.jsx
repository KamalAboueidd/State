import { useDispatch, useSelector } from "react-redux";
import {
  courseAdded,
  courseUpdated,
  courseRemoved,
  couresSelectors,
} from "../../store/redux/slices/CourseSlice";

function Courses() {
  const dispatch = useDispatch();
  const courses = useSelector(couresSelectors.selectAll);

  const handleAddCourse = () => {
    dispatch(
      courseAdded({
        id: Date.now(),
        title: "React & React Router Masterclass",
        teacher: "Kamal",
      })
    );
  };

  const handleUpdateCourse = (id) => {
    dispatch(
      courseUpdated({
        id,
        changes: {
          title: "Advanced JavaScript & Architecture 🔥",
        },
      })
    );
  };

  const handleRemoveCourse = (id) => {
    dispatch(courseRemoved(id));
  };

  return (
    <div className="card">
      <h2>Courses Management (Entity Adapter)</h2>
      <button className="primary-btn" onClick={handleAddCourse}>
        + Add New Course
      </button>

      <h3>Courses List ({courses.length})</h3>
      {courses.length === 0 ? (
        <p>No courses added yet. Click above to add one!</p>
      ) : (
        <div className="list-container">
          {courses.map((course) => (
            <div key={course.id} className="list-item">
              <div>
                <h4>{course.title}</h4>
                <p>Teacher: {course.teacher}</p>
              </div>
              <div className="btn-group">
                <button onClick={() => handleUpdateCourse(course.id)}>
                  Edit
                </button>
                <button
                  className="danger-btn"
                  onClick={() => handleRemoveCourse(course.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;
