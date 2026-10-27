
const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// Xem danh sách và tìm kiếm nhân viên
router.get("/", async (req, res) => {
    try {
        const search = String(req.query.search || "").trim();
        const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const filter = search ? {
            $or: [
                { employeeId: { $regex: escaped, $options: "i" } },
                { fullName: { $regex: escaped, $options: "i" } }
            ]
        } : {};

        const employees = await Employee.find(filter).sort({ employeeId: 1 });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy danh sách nhân viên" });
    }
});

// Xem chi tiết nhân viên
router.get("/:id", async (req, res) => {
    try {
        const employee = await Employee.findOne({
            employeeId: req.params.id
        });

        if (!employee) {
            return res.status(404).json({ message: "Không tìm thấy nhân viên" });
        }

        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy thông tin nhân viên" });
    }
});

// Thêm nhân viên
router.post("/", async (req, res) => {
    try {
        const { employeeId, fullName, email } = req.body;

        if (!employeeId?.trim() || !fullName?.trim() || 
            !email?.trim()) {
            return res.status(400).json({
                message: "Mã nhân viên, họ tên và email không được để trống"
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: "Email không hợp lệ" });
        }

        const employee = await Employee.create(req.body);

        res.status(201).json({
            message: "Thêm nhân viên thành công",
            employee
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Mã nhân viên đã tồn tại" });
        }
        res.status(500).json({ message: "Lỗi thêm nhân viên" });
    }
});

// Cập nhật nhân viên
router.put("/:id", async (req, res) => {
    try {
        const employee = await Employee.findOneAndUpdate(
            { employeeId: req.params.id },
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!employee) {
            return res.status(404).json({ message: "Không tìm thấy nhân viên" });
        }

        res.json({
            message: "Cập nhật nhân viên thành công",
            employee
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Mã nhân viên đã tồn tại" });
        }
        res.status(500).json({ message: "Lỗi cập nhật nhân viên" });
    }
});

// Xóa nhân viên
router.delete("/:id", async (req, res) => {
    try {
        const employee = await Employee.findOneAndDelete({
            employeeId: req.params.id
        });

        if (!employee) {
            return res.status(404).json({ message: "Không tìm thấy nhân viên" });
        }

        res.json({ message: "Xóa nhân viên thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi xóa nhân viên" });
    }
});

module.exports = router;
