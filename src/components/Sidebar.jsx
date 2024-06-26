import logo from "../assets/logo3.png";
import { useState, useEffect, useContext } from "react";
import { GoHome } from "react-icons/go";
import { SlEnvolopeLetter } from "react-icons/sl";
import { FaChevronDown, FaChevronUp, FaBars, FaTimes } from "react-icons/fa";
import { CiViewList, CiUser } from "react-icons/ci";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { CgProfile } from "react-icons/cg";

const hideActionKakan = ["Kepala Kantor"];
const hideActionSeksi = [
  "Kasubag. TU",
  "Seksi Penetapan Hak & Pendaftaran",
  "Seksi Survei & Pemetaan",
  "Seksi Penataan & Pemberdayaan",
  "Seksi Pengadaan Tanah & Pengembangan",
  "Seksi Pengendalian & Penanganan Sengketa",
];

const Sidebar = ({ modal, modal2, modal3 }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const [togle, setTogle] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1280);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (
      location.pathname === "/surat-masuk" ||
      location.pathname === "/balasan-surat" ||
      location.pathname === "/surat-masuk/disposisi-surat"
    ) {
      setTogle(true);
    }
  }, [location.pathname]);

  const handlerTogglePersuratan = () => {
    setTogle((prev) => !prev);
  };

  const HandlerLogout = () => {
    sessionStorage.setItem("token", "");
    setAuth(null);
    toast.success("Berhasil logout", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="relative w-auto xl:w-auto ">
      <div
        className={`sidebar fixed z-50 xl:static transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 grid h-screen grid-rows-8 bg-white drop-shadow-custom font-poppins text-sm py-1 ${
          modal || modal2 || modal3 ? "blur-sm" : ""
        } right-0`}
      >
        <div className="grid grid-cols-6 self-center xl:flex items-center justify-start mt-10 ">
          <div className="mx-4 col-start-1/6 col-end-2 xl:w-1/3 xl:ml-10 xl:mx-0">
            <img src={logo} alt="Logo" className=" " />
          </div>
          <div className="col-start-2 col-end-6 text-start md:text-left m-5 w-auto">
            <h3 className="text-base font-black m-0">SIMDIS</h3>
            <p className="m-0">Sistem Informasi Manajemen Disposisi</p>
            <p className="m-0">Kantah Jember</p>
          </div>
          <div
            className={`xl:hidden ${
              sidebarOpen ? "" : "hidden"
            } col-start-6 col-end-6`}
          >
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-2xl"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        <div className="menu mx-8 row-start-3 row-end-8 sm:mx-6">
          <ul>
            <li
              className={`${
                location.pathname === "/dashboard"
                  ? "bg-secondary rounded-lg text-white"
                  : ""
              } hover:cursor-pointer`}
            >
              <Link
                to={"/dashboard"}
                className="py-3 flex gap-3 items-center font-medium text-sm md:px-3"
              >
                <GoHome size="1.5rem" className="ml-3" />
                <p
                  className={`${
                    location.pathname === "/dashboard"
                      ? "text-white"
                      : "text-custom"
                  } font-semibold md:block`}
                >
                  Beranda
                </p>
              </Link>
            </li>
            <li
              onClick={handlerTogglePersuratan}
              className={`${
                location.pathname === "/persuratan"
                  ? "bg-secondary rounded-lg text-white"
                  : ""
              } hover:cursor-pointer py-3 grid grid-cols-4 gap-3 items-center font-medium text-sm md:px-3 justify-between`}
            >
              <div className="left flex gap-3 col-start-1 col-end-4 justify-self-start">
                <SlEnvolopeLetter size="1.4rem" className="ml-3" />
                <p className="text-custom font-semibold md:block">Persuratan</p>
              </div>
              <div className="right justify-self-end col-start-4 col-end-5">
                {togle ? (
                  <FaChevronUp size="1rem" />
                ) : (
                  <FaChevronDown size="1rem" />
                )}
              </div>
              <div
                className={`sub-menu col-start-1 col-end-5 ${
                  togle ? "block" : "hidden"
                }`}
              >
                <ol className="md:list-disc md:list-inside ">
                  <Link to={"/surat-masuk?page=1"}>
                    <li
                      className={`${
                        location.pathname === "/surat-masuk"
                          ? "bg-secondary text-white text-sm"
                          : "text-custom font-semibold"
                      } pl-1 py-2 md:px-5 rounded-md `}
                    >
                      Surat Masuk
                    </li>
                  </Link>
                  <Link to={"/balasan-surat?page=1"}>
                    <li
                      className={`${
                        location.pathname === "/balasan-surat"
                          ? "bg-secondary text-white text-sm"
                          : "text-custom font-semibold"
                      } pl-1 py-2 md:px-5 rounded-md `}
                    >
                      Balasan Surat
                    </li>
                  </Link>
                </ol>
              </div>
            </li>
            <li
              className={`${
                location.pathname === "/rekap-surat"
                  ? "bg-secondary rounded-lg text-white"
                  : ""
              } hover:cursor-pointer`}
            >
              <Link
                to={"/rekap-surat?page=1"}
                className="py-3 flex gap-3 items-center font-medium text-sm md:px-3"
              >
                <CiViewList size="1.5rem" className="ml-3" />
                <p
                  className={`${
                    location.pathname === "/rekap-surat"
                      ? "text-white"
                      : "text-custom"
                  } font-semibold md:block`}
                >
                  Rekap Surat
                </p>
              </Link>
            </li>
            <li
              className={`${
                location.pathname === "/manajemen-user"
                  ? "bg-secondary rounded-lg text-white"
                  : ""
              } hover:cursor-pointer`}
            >
              {hideActionSeksi.includes(auth?.type) ||
              hideActionKakan.includes(auth?.type) ? null : (
                <Link
                  to={"/manajemen-user"}
                  className="hover:cursor-pointer py-3 flex gap-3 items-center font-semibold text-sm md:px-3"
                >
                  <CiUser size="1.5rem" className="ml-3" />
                  <p
                    className={`${
                      location.pathname === "/manajemen-user"
                        ? "text-white"
                        : "text-custom"
                    } font-semibold md:block`}
                  >
                    Manajemen User
                  </p>
                </Link>
              )}
            </li>
          </ul>
        </div>
        <div className="account row-span-8">
          <div className="flex items-center p-2">
            <div
              className={`flex ms-3 items-center ml-10 ${
                location.pathname === "/profile" ? " text-white" : ""
              }`}
            >
              <Link to={"/profile"} className="flex items-center space-x-2">
                <div className="b p-2 rounded-full">
                  <CgProfile size="1.5rem" />
                </div>
                <div className="status5 md:block">
                  <h4 className="font-bold text-sm">{auth?.name}</h4>
                  <p className="text-xs">{auth?.email}</p>
                </div>
              </Link>
              <button className="logout ml-4" onClick={HandlerLogout}>
                <HiOutlineLogout size="1.5rem" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex xl:hidden pl-4 pt-4 ${sidebarOpen ? "hidden" : ""}`}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
