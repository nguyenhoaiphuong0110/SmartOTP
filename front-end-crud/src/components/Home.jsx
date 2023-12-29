import React, { useState,useEffect } from 'react'
import JSEncrypt from 'jsencrypt';
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import CircularJSON  from "circular-json"

const Home = () => {
  const navigate = useNavigate("");
  const [employeeEmail, setEmployeeEmail] = useState([]);
  const [userId, setUserId] = useState('');
  const [secretKey,setSecretKey] = useState('');
  const [jwt,setJwt] = useState('');
  const [error,setError] = useState('');
  const [decryptedData, setDecryptedData] = useState('');
  const [pattern, setPattern] = useState('1');
  const [digits, setDigits] = useState(6);
  const [totpCodes, setTotpCodes] = useState([]);
  const[count,setCount] = useState(30);
  const [buttonClicked, setButtonClicked] = useState(false);
  const privateKey =`MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAPd2a1uJ8b22UxksXqmSxH2AsUj6mvt93Y/b6dKrdOg0PGZdFXXodyFX/qzlpmWpMUISTL/9KTcP0gX9s8MNVHWJ3lvAYNxukYzAxArckQjujV+6OYHshoV+mx3Wlw1IqvDDMHmnaotcxjiwYRMsd7wkyFk/kcUMMgzOyI/yoDrBAgMBAAECgYBaw/6gtroKYaOdKh8Wh5S2i8t6/yB1ejcYGwtqkCTzPqWgziee9cMsYcAx3pHn2+ULXPb1vH+viIf6VpHmyy7crSkuodL/WXUIDc7RT2ia9SD3wJxncQqc48O3FgNwUv4eGhMsMZgLB3Iz+gMKzWO/EE6xHPC2SC9sKM0f6ejWmQJBAP/RAyLScREO2i7jXvuOqqwsvm2UyXG2U5Dud8Sa3rwptyiAITZpkVYaA9rNOP+M7gzqQQLhMiKTDzI8rLb0WC8CQQD3o99o80KzESePRRDbpISqUgJYSuvA+T14AkkOyNifIyILel6RSp/Dhe/oDgSkbGiJP3uPod03pQk9HEqWzfAPAkEA12iXnG3ZuYRpIoxhAbBLdPmkTD+6NN9TlLnI7it+nLD/wsHJtbjFIdx8HHUsprt0BDoJDjS0c7qjVCkVQmWUDwJBAIb5+gaRONSzT/WmNncRaAIRqxeG1pMbBqcHz9xQGso6cw8AhtT4cLY4pbe9FEiukhfk0ytJlXMD8FIvvnQOEX8CQQDyS4VDD+8RuqnQWX4U6reoOs04Bb1N99wTnp0wAOzWeLvVUU60klXrdanISUEbLwrkL9Q4RY9y/pcIl1hp4y6B`;
  
  // cập nhập giá trị employeeEmail(userID) khi thành phần được render.
  useEffect(() => {
    // Thay thế bằng URL thực tế để nhận email nhân viên
    const employeeEmailEndpoint = 'http://localhost:8091/api/v1/employee/getEmployee';

    // Thực hiện yêu cầu HTTP để tìm nạp email của nhân viên khi thành phần được gắn kết
    axios.get(employeeEmailEndpoint)
      .then(response => {
        const employees = response.data;
        if (employees.length > 0) {
          const firstEmployeeEmail = employees[employees.length-1].email;
          setEmployeeEmail(firstEmployeeEmail);

          // Khi đã có email nhân viên, tiến hành lấy khóa bí mật
          fetchSecretKey(firstEmployeeEmail);
          fetchUserJwt(firstEmployeeEmail);
          handleOtpVerification(firstEmployeeEmail)
          
        } else {
          setError('No employees found.');
        }
      })
      .catch(error => {
        console.error('Error fetching employee email:', error);
        setError('An error occurred while fetching employee email.');
      });
  }, []);

  // cập nhập giá trị secretKey khi thành phần được render.
  useEffect(() =>{
    setSecretKey(secretKey)
  },[])

// gọi API lấy mã bí mật để đăng kí dịch vụ
  const fetchSecretKey = async(userId) => {
    // Thay thế bằng URL thực tế để lấy khóa bí mật
    const secretKeyEndpoint = 'http://127.0.0.1:8989/smartOTP/getSecretKey';

    // thêm data trên cấu trúc JSON
    const requestData = {
      userId: userId,
      regionCode:'123',
      appCode: 'CMIS',
      appKey: 'CMIS', 
      extraInfo:"good",
      publicKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD3dmtbifG9tlMZLF6pksR9gLFI+pr7fd2P2+nSq3ToNDxmXRV16HchV/6s5aZlqTFCEky//Sk3D9IF/bPDDVR1id5bwGDcbpGMwMQK3JEI7o1fujmB7IaFfpsd1pcNSKrwwzB5p2qLXMY4sGETLHe8JMhZP5HFDDIMzsiP8qA6wQIDAQAB',
    };

    // Thực hiện yêu cầu HTTP để lấy khóa bí mật, đăng kí dịch vụ
    await axios.post(secretKeyEndpoint, requestData)
      .then(response => {
        const { errorCode, secretkey, message } = response.data;

        if (errorCode === "0") {
          setSecretKey(secretkey);
          setUserId(userId);
        } else {
          setError(message);
        }
      })
      .catch(error => {
        console.error('Error fetching secret key:', error);
        setError('An error occurred while fetching the secret key.');
      });
  };

// gọi API để lấy mã JWT dựa trên employeeEmail(userID)
  const fetchUserJwt =  async(userId) => {
    // Thay thế bằng URL điểm cuối thực tế để lấy mã JWT
    const secretKeyEndpoint = 'http://127.0.0.1:8989/smartOTP/getJWTByUserId';

    // thêm data dựa trên cấu trúc JSON
    const requestData = {
      userId: userId,
      appCode: 'CMIS',
      appKey: 'CMIS',  // userId is now set to employee.email
      };

    // Thực hiện yêu cầu HTTP để lấy mã JWT
    await axios.post(secretKeyEndpoint, requestData)
      .then(response => {
        const { errorCode, jwt, message } = response.data;

        if (errorCode === "0") {
          setJwt(jwt);
          setUserId(userId);
        } else {
          setError(message);
        }
      })
      .catch(error => {
        console.error('Error fetching secret key:', error);
        setError('An error occurred while fetching the secret key.');
      });
  };


  // Chuyển đổi để tạo mã OTP
  const Convert = {
    // Chuyển đổi một chuỗi base32 thành chuỗi hex.
    base32toHex: (data) => {
      // Kiểm tra xem data có phải là một chuỗi không.
      if (typeof(data) !== typeof("")) {

        throw new Error("Argument to base32toHex() is not a string");
      }
      if (typeof(data) !== typeof("")) {
        throw new Error("Argument to base32toHex() is not a string");
      }
      if (data.length === 0) {
        throw new Error("Argument to base32toHex() is empty");
      }
      if (!data.match(/^[A-Z2-7]+=*$/i)) {
        throw new Error("Argument to base32toHex() contains invalid characters");
      }
    
      //Giá trị trả về
      var ret = "";
      //Ánh xạ cơ sở 32 ký tự theo giá trị của chúng (giá trị là chỉ mục mảng)
      var map = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".split('');
      //Chia dữ liệu thành nhóm 8
      var segments = (data.toUpperCase() + "========").match(/.{1,8}/g);
      //Thêm "=" vào dòng trên sẽ tạo ra một mục nhập không cần thiết
      segments.pop();
      //Tính chiều dài đệm
      var strip = segments[segments.length - 1].match(/=*$/)[0].length;
      //Quá nhiều '=' ở cuối. Thường là lỗi đệm do chuỗi base32 không đầy đủ
      if (strip > 6) {
        throw new Error("Invalid base32 data (too much padding)");
      }
      //Xử lý base32 trong các phần 8 ký tự
      for (var i = 0; i < segments.length; i++) {
        //Bắt đầu với bộ đệm trống mỗi lần
        var buffer = 0;
        var chars = segments[i].split("");
        //Xử lý các ký tự riêng lẻ
        for (var j = 0; j < chars.length; j++) {
          //dịch chuyển trái 32 ký tự nhưng không có giới hạn int JS 32 bit
          buffer *= map.length;
          //Ánh xạ ký tự thành giá trị thực
          var index = map.indexOf(chars[j]);
          //Sửa phần đệm bằng cách bỏ qua nó ngay bây giờ
          if (chars[j] === '=') {
            index = 0;
          }
          //Thêm giá trị thực
          buffer += index;
        }
        //Chuỗi hex đệm đến 10 ký tự (5 byte)
        var hex = ("0000000000" + buffer.toString(16)).substr(-10);
        ret += hex;
      }
      //Xóa byte theo phần đệm
      switch (strip) {
      case 6:
        return ret.substr(0, ret.length - 8);
      case 4:
        return ret.substr(0, ret.length - 6);
      case 3:
        return ret.substr(0, ret.length - 4);
      case 1:
        return ret.substr(0, ret.length - 2);
      default:
        return ret;
      }
    },

    // Chuyển đổi chuỗi hex thành một mảng byte.
    hexToArray: (hex) => {
      return hex.match(/[\dA-Fa-f]{2}/g).map(function (v) {
        return parseInt(v, 16);
      });
    },

    // Chuyển đổi một mảng byte thành chuỗi hex.
    arrayToHex: (array) => {
      var hex = "";

      if (array instanceof ArrayBuffer) {
        return Convert.arrayToHex(new Uint8Array(array));
      }
      for (var i = 0; i < array.length; i++) {
        hex += ("0" + array[i].toString(16)).substr(-2);
      }
      return hex;
    },

    // Chuyển đổi một số nguyên 32-bit thành chuỗi hex có độ dài 8 ký tự.
    int32toHex: (i) => {
      return ("00000000" + Math.floor(Math.abs(i)).toString(16)).substr(-8);
    },
  };

  const TOTP = {

    // Tính toán giá trị counter OTP dựa trên thời gian và khoảng thời gian.
    getOtpCounter: (time, interval) => {
      return (time / interval) | 0;
    },

    // Lấy giá trị counter OTP hiện tại dựa trên thời gian hiện tại và khoảng thời gian.
    getCurrentCounter: (interval) => {
      return TOTP.getOtpCounter(Date.now() / 1000 | 0, interval);
    },

    // Tạo mã OTP dựa trên khóa, giá trị counter, kích thước và một hàm callback.
    otp: (keyHex, counterInt, size, cb) => {
      var isInt = function (x) {
        return x === x | 0;
      };
      if (typeof(keyHex) !== typeof("")) {
        throw new Error("Invalid hex key");
      }
      if (typeof(counterInt) !== typeof(0) || !isInt(counterInt)) {
        throw new Error("Invalid counter value");
      }
      if (typeof(size) !== typeof(0) || (size < 6 || size > 10 || !isInt(size))) {
        throw new Error("Invalid size value (default is 6)");
      }
      TOTP.hmac(keyHex, "00000000" + Convert.int32toHex(counterInt), function (mac) {
        //The last 4 bits determine the offset of the counter
        var offset = parseInt(mac.substr(-1), 16);
        //Extract counter as a 32 bit number anddiscard possible sign bit
        var code = parseInt(mac.substr(offset * 2, 8), 16) & 0x7FFFFFFF;
        //Trim and pad as needed
        (cb || console.log)(("0000000000" + (code % Math.pow(10, size))).substr(-size));
      });
    },

    //  Tính toán HMAC (Hash-based Message Authentication Code) sử dụng khóa và giá trị đầu vào.
    hmac: (keyHex, valueHex, cb) => {
      var algo = {
        name: "HMAC",
        //SHA-1 is the standard for TOTP and HOTP
        hash: "SHA-1"
      };
      var modes = ["sign", "verify"];
      var key = Uint8Array.from(Convert.hexToArray(keyHex));
      var value = Uint8Array.from(Convert.hexToArray(valueHex));
      crypto.subtle.importKey("raw", key, algo, false, modes).then(function (cryptoKey) {
        console.debug("Key imported", keyHex);
        crypto.subtle.sign(algo, cryptoKey, value).then(function (v) {
          console.debug("HMAC calculated", value, Convert.arrayToHex(v));
          (cb || console.log)(Convert.arrayToHex(v));
        });
      });
    },

    // Kiểm tra khả năng sử dụng các tính năng crypto cần thiết.
    isCompatible: () => {
      var f = function (x) {
        return typeof(x) === typeof(f);
      };
      if (typeof(crypto) === typeof(TOTP) && typeof(Uint8Array) === typeof(f)) {
        return !!(crypto.subtle && f(crypto.subtle.importKey) && f(crypto.subtle.sign) && f(crypto.subtle.digest));
      }
      return false;
    },
  };

  // tạo hàm tính toán từ mã bí mật thành mã TOTP thông qua giải mã bằng khóa riêng tư
  const generateTotpbyDecrypt = () => {
    try {
      setCount(30); 
      setButtonClicked(true);
      const decrypt = new JSEncrypt();
      decrypt.setPrivateKey(privateKey);
      const decryptedData = decrypt.decrypt(secretKey);
      if (!decryptedData || !pattern || !digits || !setTotpCodes) {
        // Đảm bảo các giá trị cần thiết đã được đặt giá trị
        console.error("Missing necessary values for OTP generation.");
        return;
      }
      let secret = decryptedData;
      if (pattern === '1') {
        secret = Convert.base32toHex(secret);
      }

      // thời gian của giá trị OTP
      const currentCounter = TOTP.getCurrentCounter(30);
      const generatedCodes = [];
      
      TOTP.otp(secret, currentCounter, digits, (code) => {
        setTotpCodes([{ label: 'Current Code', value: code }]);
      });
    } catch (error) {
      console.error(error);
      alert("Problem generating TOTP codes. Please check your secret and pattern.");
    }
  };
  // cập nhật giá trị OTP khi thành phần render
  useEffect(() => {
    console.log(totpCodes);
  }, [totpCodes]);

  // tạo bộ đếm kiểm tra thời gian mã OTP còn tồn tại
  useEffect(() => {
    let interval;

    if (count > 0 && buttonClicked) {
      interval = setInterval(() => {
        setCount((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [count,,buttonClicked]);

  // tạo hàm xác thực
  const handleOtpVerification = async()=>{
    // gọi API từ server SmartOTP để xác thực
    try{ 
      const apiUrl = `http://127.0.0.1:8989/smartOTP/verifyOTP`;
      const otpCode = totpCodes && totpCodes.length > 0 ? totpCodes[0]?.value : undefined;

      const requestBody={
        userId: userId, 
        appCode: 'CMIS',
        appKey: 'CMIS',
        jwtToken: jwt,
        otpCode: otpCode
      }
      const jsonString = CircularJSON.stringify(requestBody);
      const response = await axios.post(apiUrl,jsonString,{
        headers:{
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });
      if (response.status === 200) {
        const {errorCode,message} = response.data;
        if (errorCode === "0") {
          console.log('OTP verified successfully');
          
          alert("Verified successfully");
          navigate('/success')


        } else {
          console.error('OTP verification failed:',message);
          console.log(userId)
      
        }
      } else {
        console.error('Error:', response.statusText);

      }
      
    } catch (error) {
      console.error('Error:', error.message);

    }
  }
  // trả về giao diện người dùng.
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-50">
      <div className="text-center">
        <h1>Xác thực SmartOTP</h1>
        {employeeEmail && <p>Số điện thoại: {employeeEmail}</p>}
        <h1>SmartOTP</h1>
        <p>Đăng kí sử dụng dịch vụ thành công</p>
        <h2>Time-based One-Time Password (TOTP) Example</h2>

        <div className="form">
          <button className="btn btn-primary" onClick={generateTotpbyDecrypt}>Lấy mã OTP</button>
          <div className="mt-3">
          <div> OTP Code: {totpCodes[0]?.value}</div>
            </div>
            {buttonClicked && <p>Mã OTP sẽ hết hạn trong :{count}</p>}
            <button type="submit" className="btn btn-primary mt-3" onClick={handleOtpVerification} >Xác thực</button>
            
        </div>
        <button type="logout" className="btn btn-danger mt-3" onClick={() => navigate('/')} >Đăng xuất</button>
      </div>
    </div>
  );
}

export default Home