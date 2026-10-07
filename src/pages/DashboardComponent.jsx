import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar, openModal, closeModal } from '../store/uiSlice';

function DashboardComponent() {
  const dispatch = useDispatch();

  // Extract sidebar status, theme, and modal from UI slice
  const { isSidebarOpen, theme, modal } = useSelector((state) => state.ui);

  return (
    <div className={`app-container ${theme}`}>
      {/* Sidebar toggle button */}
      <button onClick={() => dispatch(toggleSidebar())}>
        {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>

      <p>Sidebar Status: {isSidebarOpen ? 'Open 📂' : 'Closed 📁'}</p>

      {/* Button to open delete confirmation modal */}
      <button onClick={() => dispatch(openModal({ type: 'DELETE_USER', data: { id: 5 } }))}>
        Delete User
      </button>

      {/* Render modal if open */}
      {modal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure you want to proceed? (Modal Type: {modal.type})</h3>
            <p>Target Item ID: {modal.data?.id}</p>
            <button onClick={() => dispatch(closeModal())}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardComponent;