const express = require("express");
const app = express();
const { exists, set, incrby, get } = require("./model.redis");

app.get("/order", async (req, res) => {
  const time = new Date().getTime();
  console.log(`Time request ::::: ${time}`);

  // gia su so luong hang ton kho la 10
  const slTonKho = 10;

  // tn cua san pham la iphone15
  const keyName = "iphone15";

  // Gia su moi lan mua thi luong tieu thu hang ton kho la 1
  const slMua = 1;

  // So luong da ban ra,  ney chua ban thi set = 0, con neu ban thi update + 1 moi lan user order thanh cong !
  const getKey = await exists(keyName);
  if (!getKey) {
    // set = 0
    await set(keyName, 0);
  }

  // lay so luong ban ra
  let slBanRa = await get(keyName);
  console.log(`So luong truoc khi ban ra :::::: ${slBanRa}`);

  // Neu so luong ban ra + so luong mua > so luong ton kho => return failed
  if (+slBanRa + slMua > slTonKho) {
    console.log(`Het hang`);
    return res.json({
      status: "Error",
      message: "Het hang",
      time,
    });
  }

  // neu user order thanh cong
  slBanRa = await incrby(keyName, slMua); // Atom redis
  console.log(`Sau khi user order thanh cong ::::: ${slBanRa}`);
  if (slBanRa > slTonKho) {
    await set("banquaroi", slBanRa - slTonKho);
  }

  return res.json({
    status: "Success",
    message: "Ok",
    time,
  });
});

app.listen(3000, () => {
  console.log(`Server is running is port 3000`);
});
