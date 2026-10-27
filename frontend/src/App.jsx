
import { useEffect, useState } from "react";
import "./App.css";

const API = "/api/employees";

const emptyForm = {
  employeeId: "",
  fullName: "",
  gender: "Nam",
  dateOfBirth: "",
  department: "",
  position: "",
  email: "",
  phone: "",
  hireDate: "",
  status: "Dang lam viec"
};

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function request(url, options = {}) {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Có lỗi xảy ra");
    }

    return data;
  }

  async function loadEmployees(keyword = "") {
    try {
      setLoading(true);
      setError("");

      const url = keyword
        ? `${API}?search=${encodeURIComponent(keyword)}`
        : API;

      const data = await request(url);
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  function openAdd() {
    setForm({ ...emptyForm });
    setEditing(false);
    setShowForm(true);
    setSelected(null);
    setMessage("");
    setError("");
  }

  function openEdit(employee) {
    const data = {};

    Object.keys(emptyForm).forEach((key) => {
      data[key] = employee[key] || "";
    });

    setForm(data);
    setEditing(true);
    setShowForm(true);
    setSelected(null);
    setMessage("");
    setError("");
  }

  async function viewDetail(employeeId) {
    try {
      const data = await request(
        `${API}/${encodeURIComponent(employeeId)}`
      );
      setSelected(data);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  }

  function changeForm(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  async function saveEmployee(event) {
    event.preventDefault();

    if (
      !form.employeeId.trim() ||
      !form.fullName.trim() ||
      !form.email.trim()
    ) {
      setError("Vui lòng nhập mã nhân viên, họ tên và email");
      return;
    }

    try {
      setError("");
      setMessage("");

      const url = editing
        ? `${API}/${encodeURIComponent(form.employeeId)}`
        : API;

      const method = editing ? "PUT" : "POST";

      const data = await request(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      setMessage(data.message);
      setShowForm(false);
      await loadEmployees(search);
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteEmployee(employeeId) {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa nhân viên ${employeeId}?`
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      const data = await request(
        `${API}/${encodeURIComponent(employeeId)}`,
        { method: "DELETE" }
      );

      setMessage(data.message);
      setSelected(null);
      await loadEmployees(search);
    } catch (err) {
      setError(err.message);
    }
  }

  async function submitSearch(event) {
    event.preventDefault();
    await loadEmployees(search);
  }

  const fields = [
    ["employeeId", "Mã nhân viên"],
    ["fullName", "Họ và tên"],
    ["dateOfBirth", "Ngày sinh"],
    ["department", "Phòng ban"],
    ["position", "Chức vụ"],
    ["email", "Email"],
    ["phone", "Số điện thoại"],
    ["hireDate", "Ngày vào làm"]
  ];

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>HỆ THỐNG QUẢN LÝ NHÂN VIÊN</h1>
          <p>Ứng dụng React + Express + MongoDB Atlas</p>
        </div>
      </header>

      <main className="container">
        <section className="summary">
          <div className="summary-card">
            <span>Tổng nhân viên đang hiển thị</span>
            <strong>{employees.length}</strong>
          </div>

          <div className="summary-card">
            <span>Đang làm việc</span>
            <strong>
              {
                employees.filter(
                  (item) => item.status === "Dang lam viec"
                ).length
              }
            </strong>
          </div>

          <div className="summary-card">
            <span>Tạm nghỉ</span>
            <strong>
              {
                employees.filter(
                  (item) => item.status === "Tam nghi"
                ).length
              }
            </strong>
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <h2>Danh sách nhân viên</h2>
            <button className="btn primary" onClick={openAdd}>
              + Thêm nhân viên
            </button>
          </div>

          <form className="search-bar" onSubmit={submitSearch}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo mã hoặc tên nhân viên..."
            />

            <button className="btn primary" type="submit">
              Tìm kiếm
            </button>

            <button
              className="btn secondary"
              type="button"
              onClick={() => {
                setSearch("");
                loadEmployees();
              }}
            >
              Làm mới
            </button>
          </form>

          {message && <div className="alert success">{message}</div>}
          {error && <div className="alert error">{error}</div>}

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Mã NV</th>
                  <th>Họ tên</th>
                  <th>Phòng ban</th>
                  <th>Chức vụ</th>
                  <th>Email</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="empty">
                      Đang tải dữ liệu...
                    </td>
                  </tr>
                ) : employees.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty">
                      Không tìm thấy nhân viên
                    </td>
                  </tr>
                ) : (
                  employees.map((employee) => (
                    <tr key={employee._id}>
                      <td>
                        <strong>{employee.employeeId}</strong>
                      </td>
                      <td>{employee.fullName}</td>
                      <td>{employee.department}</td>
                      <td>{employee.position}</td>
                      <td>{employee.email}</td>
                      <td>
                        <span
                          className={
                            employee.status === "Dang lam viec"
                              ? "status active"
                              : "status inactive"
                          }
                        >
                          {employee.status === "Dang lam viec"
                            ? "Đang làm việc"
                            : employee.status === "Tam nghi"
                              ? "Tạm nghỉ"
                              : employee.status}
                        </span>
                      </td>
                      <td>
                        <div className="actions">
                          <button
                            className="btn small info"
                            onClick={() =>
                              viewDetail(employee.employeeId)
                            }
                          >
                            Xem
                          </button>
                          <button
                            className="btn small warning"
                            onClick={() => openEdit(employee)}
                          >
                            Sửa
                          </button>
                          <button
                            className="btn small danger"
                            onClick={() =>
                              deleteEmployee(employee.employeeId)
                            }
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {showForm && (
          <div className="modal-backdrop">
            <div className="modal">
              <div className="modal-heading">
                <h2>
                  {editing ? "Cập nhật nhân viên" : "Thêm nhân viên"}
                </h2>
                <button
                  className="close"
                  onClick={() => setShowForm(false)}
                >
                  ×
                </button>
              </div>

              <form onSubmit={saveEmployee}>
                <div className="form-grid">
                  {fields.map(([name, label]) => (
                    <label key={name}>
                      {label}
                      <input
                        name={name}
                        type={
                          name === "dateOfBirth" ||
                          name === "hireDate"
                            ? "date"
                            : name === "email"
                              ? "email"
                              : "text"
                        }
                        value={form[name]}
                        onChange={changeForm}
                        disabled={editing && name === "employeeId"}
                        required={[
                          "employeeId",
                          "fullName",
                          "email"
                        ].includes(name)}
                      />
                    </label>
                  ))}

                  <label>
                    Giới tính
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={changeForm}
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nu">Nữ</option>
                      <option value="Khac">Khác</option>
                    </select>
                  </label>

                  <label>
                    Trạng thái
                    <select
                      name="status"
                      value={form.status}
                      onChange={changeForm}
                    >
                      <option value="Dang lam viec">
                        Đang làm việc
                      </option>
                      <option value="Tam nghi">Tạm nghỉ</option>
                    </select>
                  </label>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={() => setShowForm(false)}
                  >
                    Hủy
                  </button>
                  <button type="submit" className="btn primary">
                    {editing ? "Lưu thay đổi" : "Thêm nhân viên"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {selected && (
          <div className="modal-backdrop">
            <div className="modal detail-modal">
              <div className="modal-heading">
                <h2>Chi tiết nhân viên</h2>
                <button
                  className="close"
                  onClick={() => setSelected(null)}
                >
                  ×
                </button>
              </div>

              <div className="details">
                {[
                  ["Mã nhân viên", selected.employeeId],
                  ["Họ tên", selected.fullName],
                  ["Giới tính", selected.gender],
                  ["Ngày sinh", selected.dateOfBirth],
                  ["Phòng ban", selected.department],
                  ["Chức vụ", selected.position],
                  ["Email", selected.email],
                  ["Số điện thoại", selected.phone],
                  ["Ngày vào làm", selected.hireDate],
                  ["Trạng thái", selected.status]
                ].map(([label, value]) => (
                  <div className="detail-row" key={label}>
                    <strong>{label}</strong>
                    <span>{value || "Chưa cập nhật"}</span>
                  </div>
                ))}
              </div>

              <div className="form-actions">
                <button
                  className="btn secondary"
                  onClick={() => setSelected(null)}
                >
                  Đóng
                </button>
                <button
                  className="btn warning"
                  onClick={() => openEdit(selected)}
                >
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        Quản lý nhân viên | React + Node.js + MongoDB Atlas
      </footer>
    </div>
  );
}
