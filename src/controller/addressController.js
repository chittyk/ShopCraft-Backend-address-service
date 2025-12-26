const Address = require("../models/Address");

const createAddress = async (req, res) => {
  try {
    const {
      user,
      fullName,
      phone,
      houseNumber,
      street,
      city,
      state,
      pincode,
      note,
    } = req.body;
    if (
      !user ||
      !fullName ||
      !phone ||
      !houseNumber ||
      !street ||
      !city ||
      !state ||
      !pincode
    )
      return res.status(400).json({ msg: "Missing required fields" });

    const isExist = await Address.findOne({ user, pincode, houseNumber });

    if (isExist)
      return res.status(409).json({ msg: "This Address Already Exists" });

    const newAddress = new Address({
      user,
      fullName,
      phone,
      houseNumber,
      street,
      city,
      state,
      pincode,
      note,
    });
    await newAddress.save();

    res
      .status(200)
      .json({ msg: "address saved successfully", address: newAddress });
  } catch (error) {
    console.log("server error : ", error);
    return res.status(502).json({ msg: "server side error" });
  }
};

const getAddressByUser = async (req, res) => {
  try {
    const { user } = req.params;
    if (!user) {
      return res.status(400).json({ msg: "Missing user ID" });
    }

    const addresses = await Address.find({ user });

    if (!addresses.length) {
      return res.status(404).json({ msg: "No addresses found for this user" });
    }

    return res.status(200).json({ addresses });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ msg: "Server side error" });
  }
};

const getSelectedAddress = async (req, res) => {
  try {
    const { user } = req.params;
    if (!user) {
      return res.status(400).json({ msg: "Missing user ID" });
    }

    const addresses = await Address.find({ user });
    if (!addresses.length) {
      return res.status(404).json({ msg: "No addresses found for this user" });
    }

    const address = addresses.find((addr) => addr.isDefault === true);

    console.log(address);
    if (!addresses.length) {
      return res.status(404).json({ msg: "No address found for this user" });
    }
    return res.status(200).json({ address });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ msg: "Server side error" });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      phone,
      houseNumber,
      street,
      city,
      state,
      pincode,
      note,
      isDefault,
    } = req.body;

    const address = await Address.findById(id);
    if (!address) return res.status(404).json({ msg: "Address not found" });

    if (fullName) address.fullName = fullName;
    if (phone) address.phone = phone;
    if (houseNumber) address.houseNumber = houseNumber;
    if (street) address.street = street;
    if (city) address.city = city;
    if (state) address.state = state;
    if (pincode) address.pincode = pincode;
    if (note) address.note = note;
    if (isDefault === true) {
      await Address.updateMany(
        { user: address.user, _id: { $ne: address._id } },
        { $set: { isDefault: false } }
      );
      address.isDefault = true;
    }

    await address.save();
    return res.status(200).json({
      msg: "Address updated successfully",
      address,
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ msg: "Server side error" });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ msg: "Missing address ID" });
    }

    const address = await Address.findByIdAndDelete(id);

    if (!address) {
      return res.status(404).json({ msg: "Address not found" });
    }

    return res.status(200).json({ msg: "Address deleted successfully" });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ msg: "Server side error" });
  }
};

const getAddressById = async (req, res) => {
  try {
    const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "Missing address ID" });
  }

  const address = await Address.findById(id);
  if (!address) {
    return res.status(404).json({ msg: "Address not found" });
  }
  res.status(200).json({ address });
  } catch (error) {
    console.log("server error : ",error)
    return res.status(502).json({msg:"server error"})
  }
};

module.exports = {
  createAddress,
  getAddressByUser,
  getSelectedAddress,
  updateAddress,
  deleteAddress,
  getAddressById
};
