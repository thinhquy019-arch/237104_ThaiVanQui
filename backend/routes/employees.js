
const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// Kiểm tra email hợp lệ
function kiemTraEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Kiểm tra dữ liệu bắt buộc
function kiemTraDuLieu(data) {
    if (
        typeof data.employeeId !== "string" ||
        !data.employeeId.trim() ||
        typeof data.fullName !== "string" ||
        !data.fullName.trim() ||
        typeof data.email !== "string" ||
        !data.email.trim()
    ) {
        return "Mã nhân viên, họ tên và email không được để trống";
    }

    if (!kiemTraEmail(data.email)) {
        return "Email không hợp lệ";
    }

    return null;
}

// 1. Xem danh sách và tìm kiếm nhân viên
router.get("/", async (req, res) => {
    try {
        const search = String(req.query.search || "").trim();

        // Tránh ký tự đặc biệt làm sai Regex
        const escaped = search.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

        const filter = search
            ? {
                  $or: [
                      {
                          employeeId: {
                              $regex: escaped,
                              $options: "i"
                          }
                      },
                      {
                          fullName: {
                              $regex: escaped,
                              $options: "i"
                          }
                      }
                  ]
              }
            : {};

        const employees = await Employee.find(filter).sort({
            employeeId: 1
        });

        return res.status(200).json(employees);
    } catch (error) {
        console.error("Lỗi lấy danh sách:", error.message);

        return res.status(500).json({
            message: "Lỗi lấy danh sách nhân viên"
        });
    }
});

// 2. Xem chi tiết nhân viên
router.get("/:id", async (req, res) => {
    try {
        const employee = await Employee.findOne({
            employeeId: req.params.id
        });

        if (!employee) {
            return res.status(404).json({
                message: "Không tìm thấy nhân viên"
            });
        }

        return res.status(200).json(employee);
    } catch (error) {
        console.error("Lỗi xem chi tiết:", error.message);

        return res.status(500).json({
            message: "Lỗi lấy thông tin nhân viên"
        });
    }
});

// 3. Thêm nhân viên
router.post("/", async (req, res) => {
    try {
        const data = req.body;

        const loi = kiemTraDuLieu(data);

        if (loi) {
            return res.status(400).json({
                message: loi
            });
        }

        const employee = await Employee.create(data);

        return res.status(201).json({
            message: "Thêm nhân viên thành công",
            employee
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Mã nhân viên đã tồn tại"
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message
            });
        }

        console.error("Lỗi thêm nhân viên:", error.message);

        return res.status(500).json({
            message: "Lỗi thêm nhân viên"
        });
    }
});

// 4. Cập nhật nhân viên
router.put("/:id", async (req, res) => {
    try {
        const data = { ...req.body };

        // Không cho phép sửa mã nhân viên
        delete data.employeeId;
        delete data._id;
        delete data.__v;

        if (
            data.fullName !== undefined &&
            (typeof data.fullName !== "string" ||
                !data.fullName.trim())
        ) {
            return res.status(400).json({
                message: "Họ tên không được để trống"
            });
        }

        if (data.email !== undefined) {
            if (
                typeof data.email !== "string" ||
                !kiemTraEmail(data.email)
            ) {
                return res.status(400).json({
                    message: "Email không hợp lệ"
                });
            }
        }

        const employee = await Employee.findOneAndUpdate(
            { employeeId: req.params.id },
            { $set: data },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!employee) {
            return res.status(404).json({
                message: "Không tìm thấy nhân viên"
            });
        }

        return res.status(200).json({
            message: "Cập nhật nhân viên thành công",
            employee
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Mã nhân viên đã tồn tại"
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message
            });
        }

        console.error("Lỗi cập nhật:", error.message);

        return res.status(500).json({
            message: "Lỗi cập nhật nhân viên"
        });
    }
});

// 5. Xóa nhân viên
router.delete("/:id", async (req, res) => {
    try {
        const employee = await Employee.findOneAndDelete({
            employeeId: req.params.id
        });

        if (!employee) {
            return res.status(404).json({
                message: "Không tìm thấy nhân viên"
            });
        }

        return res.status(200).json({
            message: "Xóa nhân viên thành công"
        });
    } catch (error) {
        console.error("Lỗi xóa nhân viên:", error.message);

        return res.status(500).json({
            message: "Lỗi xóa nhân viên"
        });
    }
});

module.exports = router;
