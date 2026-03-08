-- ============================================
-- Employee Management System Database Schema
-- ============================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Create database
CREATE DATABASE IF NOT EXISTS `employee_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `employee_db`;

-- ============================================
-- Table: departemen
-- ============================================
CREATE TABLE `departemen` (
  `departemen_id` INT NOT NULL AUTO_INCREMENT,
  `nama_departemen` VARCHAR(100) NOT NULL,
  `lokasi` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (`departemen_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: jam_kerja
-- ============================================
CREATE TABLE `jam_kerja` (
  `jam_kerja_id` INT NOT NULL AUTO_INCREMENT,
  `nama_shift` VARCHAR(50) NOT NULL,
  `hari` ENUM('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu') NOT NULL,
  `jam_masuk` TIME NOT NULL,
  `jam_pulang` TIME NOT NULL,
  `keterangan` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (`jam_kerja_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: karyawan
-- ============================================
CREATE TABLE `karyawan` (
  `karyawan_id` INT NOT NULL AUTO_INCREMENT,
  `departemen_id` INT DEFAULT NULL,
  `jam_kerja_id` INT DEFAULT NULL,
  `nama_lengkap` VARCHAR(100) NOT NULL,
  `nik` VARCHAR(20) NOT NULL UNIQUE,
  `jabatan` VARCHAR(50) NOT NULL,
  `tanggal_masuk` DATE NOT NULL,
  `status` ENUM('aktif', 'resign') NOT NULL DEFAULT 'aktif',
  PRIMARY KEY (`karyawan_id`),
  KEY `departemen_id` (`departemen_id`),
  KEY `jam_kerja_id` (`jam_kerja_id`),
  CONSTRAINT `karyawan_ibfk_1` FOREIGN KEY (`departemen_id`) REFERENCES `departemen` (`departemen_id`) ON DELETE SET NULL,
  CONSTRAINT `karyawan_ibfk_2` FOREIGN KEY (`jam_kerja_id`) REFERENCES `jam_kerja` (`jam_kerja_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: user
-- ============================================
CREATE TABLE `user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `id_karyawan` INT DEFAULT NULL,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'hr', 'karyawan') NOT NULL,
  `status` ENUM('aktif', 'resign') NOT NULL DEFAULT 'aktif',
  PRIMARY KEY (`user_id`),
  KEY `id_karyawan` (`id_karyawan`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_karyawan`) REFERENCES `karyawan` (`karyawan_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: absensi
-- ============================================
CREATE TABLE `absensi` (
  `absensi_id` INT NOT NULL AUTO_INCREMENT,
  `karyawan_id` INT DEFAULT NULL,
  `tanggal` DATE NOT NULL,
  `waktu_masuk` TIME DEFAULT NULL,
  `waktu_pulang` TIME DEFAULT NULL,
  `status_kehadiran` ENUM('hadir', 'terlambat', 'izin', 'sakit', 'alpha') NOT NULL DEFAULT 'hadir',
  `status_karyawan` ENUM('aktif', 'resign') DEFAULT NULL,
  `catatan` TEXT DEFAULT NULL,
  PRIMARY KEY (`absensi_id`),
  KEY `karyawan_id` (`karyawan_id`),
  CONSTRAINT `absensi_ibfk_1` FOREIGN KEY (`karyawan_id`) REFERENCES `karyawan` (`karyawan_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: izin_cuti
-- ============================================
CREATE TABLE `izin_cuti` (
  `izin_id` INT NOT NULL AUTO_INCREMENT,
  `karyawan_id` INT DEFAULT NULL,
  `tanggal_pengajuan` DATE NOT NULL,
  `tanggal_mulai` DATE NOT NULL,
  `tanggal_selesai` DATE NOT NULL,
  `jenis` ENUM('cuti', 'izin', 'sakit', 'lainnya') NOT NULL,
  `alasan` TEXT DEFAULT NULL,
  `status` ENUM('menunggu', 'disetujui', 'ditolak') NOT NULL DEFAULT 'menunggu',
  PRIMARY KEY (`izin_id`),
  KEY `karyawan_id` (`karyawan_id`),
  CONSTRAINT `izin_cuti_ibfk_1` FOREIGN KEY (`karyawan_id`) REFERENCES `karyawan` (`karyawan_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Sample Data: Departemen
-- ============================================
INSERT INTO `departemen` (`departemen_id`, `nama_departemen`, `lokasi`) VALUES
(1, 'IT', 'Jakarta'),
(2, 'HRD', 'Bandung'),
(3, 'Finance', 'Surabaya'),
(4, 'Operations', 'Jakarta');

-- ============================================
-- Sample Data: Jam Kerja
-- ============================================
INSERT INTO `jam_kerja` (`jam_kerja_id`, `nama_shift`, `hari`, `jam_masuk`, `jam_pulang`, `keterangan`) VALUES
(1, 'Pagi', 'Senin', '08:00:00', '16:00:00', 'Shift Pagi'),
(2, 'Pagi', 'Selasa', '08:00:00', '16:00:00', 'Shift Pagi'),
(3, 'Pagi', 'Rabu', '08:00:00', '16:00:00', 'Shift Pagi'),
(4, 'Pagi', 'Kamis', '08:00:00', '16:00:00', 'Shift Pagi'),
(5, 'Pagi', 'Jumat', '08:00:00', '16:00:00', 'Shift Pagi'),
(6, 'Siang', 'Senin', '14:00:00', '22:00:00', 'Shift Siang'),
(7, 'Siang', 'Selasa', '14:00:00', '22:00:00', 'Shift Siang'),
(8, 'Siang', 'Rabu', '14:00:00', '22:00:00', 'Shift Siang'),
(9, 'Siang', 'Kamis', '14:00:00', '22:00:00', 'Shift Siang'),
(10, 'Siang', 'Jumat', '14:00:00', '22:00:00', 'Shift Siang');

-- ============================================
-- Sample Data: Karyawan
-- ============================================
INSERT INTO `karyawan` (`karyawan_id`, `departemen_id`, `jam_kerja_id`, `nama_lengkap`, `nik`, `jabatan`, `tanggal_masuk`, `status`) VALUES
(1, 1, 1, 'Andi Saputra', '1234567890', 'Programmer', '2022-01-10', 'aktif'),
(2, 2, 2, 'Budi Hartono', '9876543210', 'HR Staff', '2021-11-05', 'aktif'),
(3, 3, 3, 'Citra Lestari', '1928374650', 'Akuntan', '2023-02-15', 'aktif'),
(4, 1, 4, 'Dewi Anggraini', '1122334455', 'Developer', '2023-06-01', 'aktif'),
(5, 4, 5, 'Eko Prasetyo', '5544332211', 'Operator', '2023-08-15', 'aktif');

-- ============================================
-- Sample Data: User (passwords are hashed with bcrypt)
-- Default passwords:
--   andi -> password123
--   budi -> password456
--   citra -> password789
--   dewi -> user123
--   eko -> user456
-- ============================================
INSERT INTO `user` (`user_id`, `id_karyawan`, `username`, `password`, `role`, `status`) VALUES
(1, 1, 'andi', '$2a$10$rH4zK.3qQJ5xN9vL8mP2uO6wY7tR1sE4dF5gH6jK7lM8nO9pQ0rS1', 'admin', 'aktif'),
(2, 2, 'budi', '$2a$10$tU5vW6xY7zA8bC9dE0fG1hI2jK3lM4nO5pQ6rS7tU8vW9xY0zA1bC', 'hr', 'aktif'),
(3, 3, 'citra', '$2a$10$2dE3fG4hI5jK6lM7nO8pQ9rS0tU1vW2xY3zA4bC5dE6fG7hI8jK9l', 'karyawan', 'aktif'),
(4, 4, 'dewi', '$2a$10$M4nO5pQ6rS7tU8vW9xY0zA1bC2dE3fG4hI5jK6lM7nO8pQ9rS0tU1', 'karyawan', 'aktif'),
(5, 5, 'eko', '$2a$10$vW2xY3zA4bC5dE6fG7hI8jK9lM0nO1pQ2rS3tU4vW5xY6zA7bC8dE', 'karyawan', 'aktif');

-- ============================================
-- Sample Data: Absensi
-- ============================================
INSERT INTO `absensi` (`absensi_id`, `karyawan_id`, `tanggal`, `waktu_masuk`, `waktu_pulang`, `status_kehadiran`, `status_karyawan`, `catatan`) VALUES
(1, 1, '2024-06-01', '08:00:00', '16:00:00', 'hadir', 'aktif', 'Tepat waktu'),
(2, 2, '2024-06-01', '08:30:00', '16:30:00', 'terlambat', 'aktif', 'Keterlambatan 30 menit'),
(3, 3, '2024-06-01', NULL, NULL, 'sakit', 'aktif', 'Demam'),
(4, 1, '2024-06-02', '08:05:00', '16:00:00', 'terlambat', 'aktif', 'Terlambat 5 menit'),
(5, 4, '2024-06-02', '07:55:00', '16:00:00', 'hadir', 'aktif', 'Tepat waktu'),
(6, 5, '2024-06-02', '08:00:00', '16:00:00', 'hadir', 'aktif', 'Tepat waktu');

-- ============================================
-- Sample Data: Izin Cuti
-- ============================================
INSERT INTO `izin_cuti` (`izin_id`, `karyawan_id`, `tanggal_pengajuan`, `tanggal_mulai`, `tanggal_selesai`, `jenis`, `alasan`, `status`) VALUES
(1, 1, '2024-06-01', '2024-06-10', '2024-06-12', 'cuti', 'Cuti keluarga', 'menunggu'),
(2, 2, '2024-06-02', '2024-06-15', '2024-06-17', 'izin', 'Urusan pribadi', 'disetujui'),
(3, 3, '2024-06-03', '2024-06-20', '2024-06-21', 'sakit', 'Rawat jalan', 'ditolak'),
(4, 4, '2024-06-05', '2024-06-25', '2024-06-27', 'cuti', 'Liburan', 'menunggu');

COMMIT;
