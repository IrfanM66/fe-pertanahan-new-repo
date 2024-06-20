import { AiOutlineCloseSquare } from "react-icons/ai";
import { PutManagemenUser } from "../../../utils/FetchmanagemenUser";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ModalEdit = (props) => {
  const { modal, HandlerEdit, user, setUsers } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [oldpassword, setOldPassword] = useState(null);
  const [password, setPassword] = useState(null);
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleRepasswordChange = (e) => {
    setRepassword(e.target.value);
    setError("");
  };

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setType(user?.type);
  }, [user]);

  const HandlerSubmit = async (event) => {
    event.preventDefault();
    const password = event.target.new_password.value;
    const repassword = event.target.confirm_password.value;

    if (password !== repassword) {
      setError("Password dan Konfirmasi Password Harus Sama");
      return;
    } else {
      setError("");
    }

    let data = {
      name: event.target.name.value,
      email: event.target.email.value,
      old_password: event.target.old_password.value,
      password: event.target.new_password.value,
      confirm_password: event.target.confirm_password.value,
      type: event.target.type.value
    };

    try {
      const response = await PutManagemenUser(user.id, data);
      console.log("id:", data);

      console.log(response);
      if (response.status === true) {
        setUsers((prev) => {
          return prev.map((userItem) => {
            if (userItem.id === user.id) {
              return { ...userItem, ...data };
            }
            return userItem;
          });
        });
        HandlerEdit({ status: true });
      } else {
        HandlerEdit({ status: false, message: response.message });
      }
    } catch (error) {
      let errorMessage = "Terjadi kesalahan";
      if (error.response && error.response.status === 401) {
        errorMessage = "Password lama Salah";
      }
      HandlerEdit({ status: false, message: errorMessage });
    }
  };

  if (!modal || !user) {
    return null;
  }
  return (
    <form
      onSubmit={HandlerSubmit}
      className="fixed bg-white py-3 content-between border-solid rounded-lg drop-shadow-custom z-50 inset-x-38/100 inset-y-5/100"
    >
      <div className="header flex justify-between py-2 w-10/12 m-auto items-center">
        <h3 className="font-semibold text-xl text-custom">Edit User</h3>
        <AiOutlineCloseSquare
          size={"1.5rem"}
          className="text-custom"
          onClick={HandlerEdit}
        />
      </div>
      <div className="input w-10/12 m-auto grid gap-3">
        <div className="name relative grid gap-1">
          <label htmlFor="name" className="text-custom font-semibold">
            Nama Lengkap
          </label>
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="outline-none border-2 border-quaternary w-full py-2.5 px-3 text-sm text-custom rounded-lg"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="email relative grid gap-1">
          <label htmlFor="email" className="text-custom font-semibold">
            Email
          </label>
          <input
            type="email"
            placeholder="Tambahkan email"
            className="outline-none border-2 border-quaternary w-full py-2.5 px-3 text-sm text-custom rounded-lg"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="old_password relative grid gap-1">
          <label htmlFor="old_password" className="text-custom font-semibold">
            Password Lama
          </label>
          <input
            type="password"
            placeholder="Masukkan password"
            className="outline-none border-2 border-quaternary w-full py-2.5 px-3 text-sm text-custom rounded-lg"
            id="old_password"
            value={oldpassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="new_password relative grid gap-1">
          <label htmlFor="new_password" className="text-custom font-semibold">
            Password baru
          </label>
          <input
            type="password"
            placeholder="Masukkan password baru"
            className="outline-none border-2 border-quaternary w-full py-2.5 px-3 text-sm text-custom rounded-lg"
            id="new_password"
            value={password}
            onChange={handlePasswordChange}
          />
          <p className="text-red-500 text-xs flex right-0 left-0 mx-auto my-0 text-start">
            {error === true ? null : error}
          </p>
        </div>
        <div className="confirm_password relative grid gap-1">
          <label
            htmlFor="confirm_password"
            className="text-custom font-semibold"
          >
            Konfirmasi Password
          </label>
          <input
            type="password"
            placeholder="Masukkan konfirmasi password"
            className="outline-none border-2 border-quaternary w-full py-2.5 px-3 text-sm text-custom rounded-lg"
            id="confirm_password"
            value={repassword}
            onChange={handleRepasswordChange}
          />
          <p className="text-red-500 text-xs flex right-0 left-0 mx-auto my-0 text-start">
            {error === true ? null : error}
          </p>
        </div>
        <div className="type grid gap-1">
          <label htmlFor="type" className="text-custom text-base font-semibold">
            Role
          </label>
          <select
            id="type"
            className="outline-none border-2 border-quaternary w-full py-2.5 px-3 text-sm text-custom rounded-lg"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option className="font-normal" value="0">
              Admin
            </option>
            <option className="font-normal" value="1">
              Kepala Kantor
            </option>
            <option className="font-normal" value="2">
              Kasubag. TU
            </option>
            <option className="font-normal" value="3">
              Seksi Penetapan Hak & Pendaftaran
            </option>
            <option className="font-normal" value="4">
              Seksi Survei & Pemetaan
            </option>
            <option className="font-normal" value="5">
              Seksi Penataan & Pemberdayaan
            </option>
            <option className="font-normal" value="6">
              Seksi Pengadaan Tanah & Pengembangan
            </option>
            <option className="font-normal" value="7">
              Seksi Pengendalian & Penanganan Sengketa
            </option>
          </select>
        </div>
        <div className="button grid gap-8 grid-flow-col text-white font-semibold text-center">
          <button
            type="button"
            onClick={HandlerEdit}
            className="grid grid-flow-col gap-2 items-center py-2 bg-red-500 rounded-lg"
          >
            <p>Batal</p>
          </button>
          <button
            type="submit"
            className="grid grid-flow-col gap-2 items-center py-2 bg-secondary rounded-lg"
          >
            <p>Simpan</p>
          </button>
        </div>
      </div>
    </form>
  );
};

export default ModalEdit;
