import { useState, useEffect, useRef, useCallback } from "react";
import TecCells from "./pompany.png";
import Update from "./Update";
import { BsCamera } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";
import { useTheme } from "../../context/ThemeContext";

const BASE_URL = "https://workifyback-production.up.railway.app";

const CompanyProfile = () => {
  const { isDarkMode } = useTheme();
  const [companyData, setCompanyData] = useState(() => {
    const saved = localStorage.getItem("signup_form_storage");
    return saved
      ? JSON.parse(saved)
      : {
          companyName: "",
          phone: "",
          email: "",
          website: "",
          industry: "",
          country: "",
          city: "",
          about: "",
          logo: "",
        };
  });

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [tempAbout, setTempAbout] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [logo, setLogo] = useState(
    localStorage.getItem("companyLogo") || TecCells
  );
  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const getCorrectUrl = (path) => {
    if (!path) return TecCells;
    if (path.startsWith("blob:") || path.startsWith("data:")) return path;
    let cleanPath = path;
    if (path.includes("localhost:5000")) {
      cleanPath = path.split("/uploads/")[1];
      return `${BASE_URL}/uploads/${cleanPath}`;
    }
    if (!path.startsWith("http"))
      return `${BASE_URL}/${path.replace(/^\//, "")}`;
    return path;
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    const signupData = JSON.parse(
      localStorage.getItem("signup_form_storage") || "{}"
    );
    const rawEmail = localStorage.getItem("email") || signupData.email;
    if (!rawEmail) {
      setLoading(false);
      return;
    }
    const email = rawEmail.trim().toLowerCase();
    try {
      const res = await fetch(
        `${BASE_URL}/register/getRegister?t=${Date.now()}`
      );
      const resp = await res.json();
      const data = resp.data || resp;
      if (Array.isArray(data)) {
        const myCo = data.find(
          (c) => c.email && c.email.trim().toLowerCase() === email
        );
        if (myCo) {
          setCompanyData(myCo);
          const localAbout = localStorage.getItem(`about_${email}`);
          setTempAbout(localAbout !== null ? localAbout : myCo.about || "");
          if (myCo.logo) {
            const finalUrl = getCorrectUrl(myCo.logo);
            setLogo(finalUrl);
            localStorage.setItem("companyLogo", finalUrl);
          }
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  }, []);

  useEffect(() => {
    fetchData();
    window.addEventListener("companyUpdated", fetchData);
    return () => window.removeEventListener("companyUpdated", fetchData);
  }, [fetchData]);

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogo(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`${BASE_URL}/uploader/upload`, {
        method: "POST",
        body: formData,
      });
      const uploadData = await res.json();
      const rawPath = uploadData.url || uploadData.image || uploadData.path;
      if (rawPath) {
        const email = localStorage.getItem("email") || companyData.email;
        await fetch(`${BASE_URL}/uploader/save-image`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, logo: rawPath }),
        });
        const finalUrl = getCorrectUrl(rawPath);
        setLogo(finalUrl);
        localStorage.setItem("companyLogo", finalUrl);
        showToast("Logo muvaffaqiyatli yangilandi!");
        fetchData();
      }
    } catch (err) {
      setLogo(TecCells);
    }
  };

  const handleAboutUpdate = async () => {
    const email = localStorage.getItem("email") || companyData.email;
    const companyId = companyData?._id || companyData?.id;
    if (!companyId) {
      showToast("ID xatosi...");
      return;
    }
    try {
      localStorage.setItem(`about_${email}`, tempAbout);
      const response = await fetch(
        `${BASE_URL}/register/updateRegister/${companyId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...companyData, about: tempAbout }),
        }
      );
      if (response.ok) {
        showToast("Saqlandi!");
        setCompanyData((prev) => ({ ...prev, about: tempAbout }));
        setOpenAbout(false);
      }
    } catch (error) {
      showToast("Xatolik yuz berdi");
    }
  };

  return (
    <div
      className={`w-full min-h-screen transition-all duration-300 font-['Inter'] ${
        isDarkMode ? "bg-[#121212]" : "bg-[#f8f9fa]"
      }`}
    >
      <div className="p-4 md:p-8 w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
            <div className="relative flex items-center justify-center">
              <div className="w-20 h-20 border-4 border-[#82C6A0]/20 border-t-[#82C6A0] rounded-full animate-spin"></div>
              <div className="absolute w-12 h-12 border-4 border-[#82C6A0]/10 border-b-[#82C6A0] rounded-full animate-spin-slow"></div>
            </div>
            <p className="mt-4 text-[#82C6A0] font-medium animate-pulse tracking-widest text-sm uppercase">
              Yuklanmoqda...
            </p>
          </div>
        ) : (
          <div className="animate-fade-in w-full">
            {toast.show && (
              <div className="fixed top-5 right-5 z-[9999] bg-white shadow-2xl rounded-lg p-4 border-l-4 border-green-500 animate-bounce text-black">
                {toast.message}
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleLogoChange}
              className="hidden"
              accept="image/*"
            />

            {/* HEADER SECTION - Top Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
              <div
                className={`w-full md:flex-1 h-[70px] rounded-[18px] shadow-sm flex items-center px-8 transition-colors border ${
                  isDarkMode
                    ? "bg-[#1a1a1a] border-[#2a2a2a]"
                    : "bg-white border-white"
                }`}
              >
                <h1
                  className={`text-[22px] font-medium ${
                    isDarkMode ? "text-gray-200" : "text-[#505151]"
                  }`}
                >
                  Company profile
                </h1>
              </div>
              <button className="w-full md:w-[220px] h-[70px] bg-gradient-to-r from-[#82C6A0] to-[#5ba87d] text-white font-semibold rounded-[18px] shadow-lg hover:opacity-90 active:scale-95 transition-all text-[18px]">
                Post a Job
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* LEFT SIDE: COMPANY INFO - Left Card */}
              <div
                className={`w-full lg:w-[350px] p-8 rounded-[25px] shadow-sm relative border ${
                  isDarkMode
                    ? "bg-[#1a1a1a] border-[#2a2a2a]"
                    : "bg-white border-white"
                }`}
              >
                <button
                  onClick={() => setOpen(true)}
                  className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors group"
                >
                  <RiPencilFill className="text-gray-400 group-hover:text-[#82C6A0] text-xl" />
                </button>

                <div className="flex flex-col items-center">
                  <div className="relative group mb-4">
                    <div className="w-32 h-32 rounded-full border-4 border-[#F3F4F3] overflow-hidden flex items-center justify-center bg-white shadow-inner">
                      <img
                        src={logo}
                        className="w-full h-full object-contain"
                        alt="Logo"
                      />
                    </div>
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md border border-gray-100 hover:scale-110 hover:bg-gray-50 transition-all"
                    >
                      <BsCamera className="text-[#82C6A0] text-lg" />
                    </button>
                  </div>

                  <h2
                    className={`text-2xl font-bold mb-1 text-center ${
                      isDarkMode ? "text-white" : "text-[#2D3139]"
                    }`}
                  >
                    {companyData.companyName || "TecCells LLC"}
                  </h2>
                  <p className="text-gray-400 text-sm mb-2 text-center">
                    {companyData.industry || "Computer Software Company"}
                  </p>
                  <div className="flex items-center gap-1 mb-6">
                    <p className="text-[#FFB800] text-sm font-medium">
                      {"★".repeat(4)}
                      <span className="text-gray-300">★</span>
                      <span
                        className={
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }
                      >
                        {" "}
                        (4.0)
                      </span>
                    </p>
                    <span className="text-gray-400 text-sm border-l border-gray-300 pl-2 ml-1">
                      1K reviews
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <h3
                    className={`font-bold mb-4 text-base ${
                      isDarkMode ? "text-gray-300" : "text-[#2D3139]"
                    }`}
                  >
                    Company info:
                  </h3>
                  {[
                    { label: "Since", value: companyData.since || "2015" },
                    { label: "City", value: companyData.city || "Tashkent" },
                    {
                      label: "Country",
                      value: companyData.country || "Uzbekistan",
                    },
                    {
                      label: "Phone",
                      value: companyData.phone || "+998 94 498 65 65",
                    },
                    {
                      label: "Email",
                      value: companyData.email || "TechCells@mail.ru",
                    },
                    { label: "Telegram", value: "@TechCells" },
                    {
                      label: "Website",
                      value: companyData.website || "www.TechCells.com",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-start gap-4 text-sm"
                    >
                      <span className="text-gray-400 whitespace-nowrap">
                        {item.label}:
                      </span>
                      <span
                        className={`font-bold text-right break-all ${
                          isDarkMode ? "text-gray-200" : "text-[#2D3139]"
                        }`}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE: STATS & ABOUT */}
              <div className="flex-1 space-y-8">
                {/* Statistics Card */}
                <div
                  className={`p-8 rounded-[25px] shadow-sm border ${
                    isDarkMode
                      ? "bg-[#1a1a1a] border-[#2a2a2a]"
                      : "bg-white border-white"
                  }`}
                >
                  <h3
                    className={`text-center font-bold mb-8 text-lg ${
                      isDarkMode ? "text-white" : "text-[#2D3139]"
                    }`}
                  >
                    Statistics
                  </h3>
                  <div className="grid grid-cols-3 divide-x divide-gray-100 dark:divide-gray-800">
                    {[
                      { val: "300", label: "Jobs posted" },
                      { val: "+30", label: "Talents" },
                      { val: "56", label: "Talents hired" },
                    ].map((stat, idx) => (
                      <div key={idx} className="text-center px-4 group">
                        <h2
                          className={`text-2xl md:text-4xl font-bold mb-2 transition-transform group-hover:scale-110 duration-300 ${
                            isDarkMode ? "text-white" : "text-[#2D3139]"
                          }`}
                        >
                          {stat.val}
                        </h2>
                        <p className="text-gray-400 text-sm font-medium">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* About Card */}
                <div
                  className={`p-8 rounded-[25px] shadow-sm min-h-[400px] relative border ${
                    isDarkMode
                      ? "bg-[#1a1a1a] border-[#2a2a2a]"
                      : "bg-white border-white"
                  }`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3
                      className={`text-lg font-bold ${
                        isDarkMode ? "text-white" : "text-[#2D3139]"
                      }`}
                    >
                      About company
                    </h3>
                    <div className="flex gap-2">
                      {tempAbout !== (companyData.about || "") && (
                        <button
                          onClick={handleAboutUpdate}
                          className="bg-[#82C6A0] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-md hover:bg-[#6fb68f] transition-all active:scale-95"
                        >
                          Save Changes
                        </button>
                      )}
                      <button
                        onClick={() => setOpenAbout(true)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors group"
                      >
                        <RiPencilFill className="text-gray-300 group-hover:text-[#82C6A0]" />
                      </button>
                    </div>
                  </div>

                  <textarea
                    className={`w-full h-64 resize-none outline-none text-[16px] leading-relaxed bg-transparent border-none focus:ring-0 ${
                      isDarkMode ? "text-gray-300" : "text-[#555]"
                    }`}
                    value={tempAbout}
                    onChange={(e) => setTempAbout(e.target.value)}
                    placeholder="Tell us something about your company..."
                  />
                </div>
              </div>
            </div>

            {open && (
              <Update
                setOpen={setOpen}
                currentData={companyData}
                onUpdate={fetchData}
              />
            )}
          </div>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `,
        }}
      />
    </div>
  );
};

export default CompanyProfile;
