import React, { useEffect, useState } from "react";
import styles from "./ManageUsers.module.css";
import { getUsers, deleteUser } from "../../../api/api";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner/Spinner";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import { FaTrash, FaUserShield, FaUser } from "react-icons/fa";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        toast.error(error.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedUser(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(selectedUser);
      setUsers((prev) => prev.filter((u) => u._id !== selectedUser));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error.message || "Delete failed");
    } finally {
      setShowModal(false);
      setSelectedUser(null);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Manage Users</h2>

      {users.length === 0 ? (
        <p className={styles.empty}>No users found</p>
      ) : (
        <div className={styles.userGrid}>
          {users.map((user) => (
            <div key={user._id} className={styles.card}>
              
              <div className={styles.top}>
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <div className={styles.defaultAvatar}>
                    <FaUser />
                  </div>
                )}

                <div>
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                </div>
              </div>

              <div className={styles.role}>
                {user.role === "admin" ? (
                  <span className={styles.admin}>
                    <FaUserShield /> Admin
                  </span>
                ) : (
                  <span className={styles.user}>
                    <FaUser /> User
                  </span>
                )}
              </div>

              <button
                className={styles.deleteBtn}
                onClick={() => handleDeleteClick(user._id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <ConfirmModal
          message="Are you sure you want to delete this user?"
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ManageUsers;