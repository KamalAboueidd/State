import { useSelector, useDispatch } from "react-redux";
import {
  toggleSidebar,
  openModal,
  closeModal,
} from "../../store/redux/slices/uiSlice";

function DashboardComponent() {
  const dispatch = useDispatch();
  const { isSidebarOpen, theme, modal } = useSelector((state) => state.ui);

  return (
    <div className="card">
      <h2>Dashboard & UI Slice</h2>
      <p>Theme: <strong>{theme}</strong></p>

      <button onClick={() => dispatch(toggleSidebar())}>
        {isSidebarOpen ? "Close Sidebar 📂" : "Open Sidebar 📁"}
      </button>

      <p>Sidebar Status: {isSidebarOpen ? "Open 📂" : "Closed 📁"}</p>

      <button
        className="danger-btn"
        onClick={() =>
          dispatch(openModal({ type: "DELETE_USER", data: { id: 5 } }))
        }
      >
        Open Delete Modal
      </button>

      {modal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Modal Active: {modal.type}</h3>
            <p>Target Item ID: {modal.data?.id}</p>
            <button onClick={() => dispatch(closeModal())}>Close Modal</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardComponent;
