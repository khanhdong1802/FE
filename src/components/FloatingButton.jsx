import React, { useState } from "react";
import {
  Wallet,
  Plus,
  RotateCcw,
  ArrowDownCircle,
  Send,
  NotebookPen,
} from "lucide-react";
// import modal
import RecordModal from "./RecordModal";
import IncomeModal from "./IncomeModal";
import WithdrawModal from "./WithdrawModal";
import DebtModal from "./DebtModal";
import SpendingLimitModal from "./SpendingLimitModal";
const FloatingButton = ({ onIncomeSuccess }) => {
  console.log("FloatingButton nhận onIncomeSuccess:", onIncomeSuccess);
  // điều khiển modal
  const [open, setOpen] = useState(false);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false); // modal nạp tiền
  const [showWithdrawModal, setShowWithdrawModal] = useState(false); // modal rút tiền
  const [showDebtModal, setShowDebtModal] = useState(false); // modal nợ
  const [showSpendingLimitModal, setShowSpendingLimitModal] = useState(false); // modal hạn mức chi tiêu
  const actions = [
    {
      icon: <Wallet size={20} />,
      label: "Hạn mức",
      onClick: () => setShowSpendingLimitModal(true), // mở modal
    },

    {
      icon: <RotateCcw size={20} />,
      label: "Trả nợ",
      onClick: () => setShowDebtModal(true), // mở modal
    },
    {
      icon: <ArrowDownCircle size={20} />,
      label: "Rút tiền",
      onClick: () => setShowWithdrawModal(true), // mở modal
    },
    {
      icon: <Send size={20} />,
      label: "Nạp tiền",
      onClick: () => setShowIncomeModal(true),
    },
    {
      icon: <NotebookPen size={20} />,
      label: "Ghi chép",
      onClick: () => setShowRecordModal(true), // mở modal
    },
  ];

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  return (
    <>
      {/* Modal hạn mức chi tiêu */}
      {showSpendingLimitModal && (
        <SpendingLimitModal
          userId={userId}
          onClose={() => setShowSpendingLimitModal(false)}
        />
      )}

      {/* Modal ghi chép */}
      {showRecordModal && (
        <RecordModal onClose={() => setShowRecordModal(false)} />
      )}

      {/* Form nạp tiền */}
      {showIncomeModal && (
        <IncomeModal
          userId={userId}
          onClose={() => setShowIncomeModal(false)}
          onIncomeSuccess={onIncomeSuccess}
        />
      )}

      {/* Form rút tiền */}
      {showWithdrawModal && (
        <WithdrawModal
          userId={userId}
          onClose={() => setShowWithdrawModal(false)}
        />
      )}

      {/* Form tra nợ */}
      {showDebtModal && (
        <DebtModal userId={userId} onClose={() => setShowDebtModal(false)} />
      )}
      {/* Chỉ hiển thị nút nổi nếu không có modal nào mở */}
      {!showIncomeModal &&
        !showRecordModal &&
        !showWithdrawModal &&
        !showDebtModal && (
          <div className="fixed bottom-6 right-6 flex flex-col items-center gap-2 z-50">
            <div
              className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                open ? "opacity-100 scale-100" : "opacity-0 scale-0"
              } origin-bottom`}
            >
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className="bg-white text-purple-500 rounded-xl shadow-md px-3 py-2 w-24 flex flex-col items-center text-xs font-medium hover:bg-purple-100 hover:text-purple-700 transition-all duration-200"
                >
                  {action.icon}
                  <span className="mt-1">{action.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="bg-purple-500 text-white text-3xl w-14 h-14 rounded-full shadow-lg hover:bg-purple-600 flex items-center justify-center transition-all"
            >
              <Plus
                size={28}
                className={`${
                  open ? "rotate-45" : "rotate-0"
                } transition-transform duration-300`}
              />
            </button>
          </div>
        )}
    </>
  );
};

export default FloatingButton;
