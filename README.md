# SmartOTP
- Đây là 1 dịch vụ xác thực giao dịch bằng mã OTP
- 2 file SmartOTP service và Login service  chạy server:
 + SmartOTP là dịch vụ xác thực, cho phép tạo mã bí mật(secretkey),mã JWT(chữ kí số) và xác thực OTP khi ứng dụng người dùng gửi yêu cầu.
 + Login là ứng dụng đăng nhập người dùng, cung cấp UserID(thông qua employee email) để thử nghiệm dịch vụ SmartOTP.
# Install
- frond-end-crud:
  + npm install
  + npm start
- Smart OTP và Login :
  + chạy 2 file này trên trên ứng dụng Intellij để khởi động máy chủ 2 ứng dụng.
  + chạy file trên front-end-crud để chạy giao diện người dùng, thưc hiện xác thực.
