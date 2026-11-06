import React, { useState } from 'react';
import {
  X, ShieldCheck, CreditCard, Smartphone, Store, Lock,
  CheckCircle2, Loader2, ArrowRight, QrCode, Banknote,
  Bike, Copy, Check,
} from 'lucide-react';

export const PaymentModal = ({
  isOpen,
  onClose,
  totalAmount,
  restaurantName,
  orderType = 'Dine-In Table',
  preOrderedItems = [],
  onPaymentSuccess,
}) => {
  // Method: 'QR' | 'Cash' | 'Card'
  const [method, setMethod] = useState('QR');
  const [selectedUpiApp, setSelectedUpiApp] = useState('GPay');
  const [copiedVpa, setCopiedVpa] = useState(false);

  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [generatedTxn, setGeneratedTxn] = useState('');

  if (!isOpen) return null;

  const restaurantVpa = `pay.${restaurantName.toLowerCase().replace(/[^a-z]/g, '')}@dineease`;

  const copyVpa = () => {
    navigator.clipboard?.writeText(restaurantVpa);
    setCopiedVpa(true);
    setTimeout(() => setCopiedVpa(false), 2000);
  };

  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = val.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setCardExpiry(val);
  };

  const handleConfirmPayment = () => {
    if (method === 'Cash') {
      onPaymentSuccess({
        paymentMethod: 'Cash',
        paymentStatus: orderType === 'Doorstep Delivery' ? 'cash_on_delivery' : 'pay_at_counter',
        transactionId: null,
      });
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      const txn = 'TXN_' + Math.floor(100000 + Math.random() * 900000);
      setGeneratedTxn(txn);
      setProcessing(false);
      setPaymentSuccess(true);

      setTimeout(() => {
        onPaymentSuccess({
          paymentMethod: method === 'QR' ? `QR Code Scan (${selectedUpiApp})` : 'Credit/Debit Card',
          paymentStatus: 'completed',
          transactionId: txn,
        });
      }, 1100);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">

        {/* Modal Top Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                DineEase Payment & Delivery
              </h3>
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                256-bit Encrypted Checkout
              </p>
            </div>
          </div>

          {!processing && !paymentSuccess && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Success Screen Animation */}
        {paymentSuccess ? (
          <div className="p-8 text-center space-y-4 my-auto animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Payment Confirmed!
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Transaction ID: <span className="font-mono font-bold text-amber-500">{generatedTxn}</span>
              </p>
            </div>
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 py-2 px-4 rounded-xl inline-block">
              ₹{Number(totalAmount).toLocaleString('en-IN')} paid via {method === 'QR' ? 'UPI QR' : 'Card'}
            </p>
          </div>
        ) : (
          <div className="p-6 overflow-y-auto space-y-5">

            {/* Bill Summary Strip */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider font-bold text-amber-800 dark:text-amber-300">
                  {restaurantName}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 mt-0.5">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{orderType}</span>
                  {preOrderedItems.length > 0 && (
                    <span>• {preOrderedItems.length} dish{preOrderedItems.length > 1 ? 'es' : ''}</span>
                  )}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">Total Amount</span>
                <span className="text-xl font-extrabold text-amber-600 dark:text-amber-400">
                  ₹{Number(totalAmount).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Payment Method Selector Tabs: Cash vs QR vs Card */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Choose Payment Mode (Cash or QR / Card):
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod('QR')}
                  className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all flex flex-col items-center gap-1.5 border ${
                    method === 'QR'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-emerald-500" />
                  <span>QR Code Scan</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('Cash')}
                  className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all flex flex-col items-center gap-1.5 border ${
                    method === 'Cash'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-amber-500" />
                  <span>Cash Payment</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('Card')}
                  className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all flex flex-col items-center gap-1.5 border ${
                    method === 'Card'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-emerald-500" />
                  <span>Card / Online</span>
                </button>
              </div>
            </div>

            {/* TAB 1: QR CODE SCAN */}
            {method === 'QR' && (
              <div className="space-y-4 pt-1 animate-fade-in">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center space-y-3">
                  
                  {/* Generated Dynamic QR Code Display */}
                  <div className="relative p-3 bg-white rounded-2xl shadow-md border-2 border-slate-200">
                    <svg
                      viewBox="0 0 120 120"
                      className="w-36 h-36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="120" height="120" fill="white" />
                      {/* Outer corner anchors */}
                      <rect x="10" y="10" width="30" height="30" rx="4" stroke="#0f172a" strokeWidth="6" fill="none" />
                      <rect x="19" y="19" width="12" height="12" rx="2" fill="#0f172a" />
                      
                      <rect x="80" y="10" width="30" height="30" rx="4" stroke="#0f172a" strokeWidth="6" fill="none" />
                      <rect x="89" y="19" width="12" height="12" rx="2" fill="#0f172a" />
                      
                      <rect x="10" y="80" width="30" height="30" rx="4" stroke="#0f172a" strokeWidth="6" fill="none" />
                      <rect x="19" y="89" width="12" height="12" rx="2" fill="#0f172a" />

                      {/* Mock QR data matrix patterns */}
                      <rect x="48" y="12" width="6" height="12" fill="#0f172a" />
                      <rect x="58" y="18" width="14" height="6" fill="#0f172a" />
                      <rect x="48" y="28" width="24" height="6" fill="#0f172a" />
                      <rect x="12" y="48" width="14" height="6" fill="#0f172a" />
                      <rect x="32" y="48" width="16" height="6" fill="#0f172a" />
                      <rect x="54" y="42" width="12" height="12" fill="#10b981" />
                      <rect x="74" y="48" width="18" height="6" fill="#0f172a" />
                      <rect x="98" y="48" width="10" height="12" fill="#0f172a" />
                      <rect x="48" y="58" width="6" height="24" fill="#0f172a" />
                      <rect x="62" y="58" width="14" height="6" fill="#0f172a" />
                      <rect x="82" y="58" width="8" height="16" fill="#0f172a" />
                      <rect x="48" y="88" width="16" height="6" fill="#0f172a" />
                      <rect x="70" y="82" width="20" height="6" fill="#0f172a" />
                      <rect x="96" y="78" width="12" height="16" fill="#0f172a" />
                      <rect x="68" y="94" width="10" height="14" fill="#0f172a" />
                      <rect x="84" y="94" width="24" height="8" fill="#0f172a" />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="w-8 h-8 rounded-full bg-emerald-500 text-white font-extrabold text-[10px] flex items-center justify-center shadow-md">
                        ₹
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Scan & Pay ₹{Number(totalAmount).toLocaleString('en-IN')}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Supports GPay, PhonePe, Paytm, BHIM & any UPI app
                    </p>
                  </div>

                  {/* UPI VPA Copy Bar */}
                  <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                    <span className="font-mono text-[11px] text-slate-600 dark:text-slate-300">
                      {restaurantVpa}
                    </span>
                    <button
                      type="button"
                      onClick={copyVpa}
                      className="text-amber-500 hover:text-amber-600 flex items-center gap-1 font-bold text-[11px]"
                    >
                      {copiedVpa ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedVpa ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Popular UPI Apps Picker */}
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 mb-1.5 text-center">
                    Select Your Installed UPI App:
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                      <button
                        key={app}
                        type="button"
                        onClick={() => setSelectedUpiApp(app)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedUpiApp === app
                            ? 'border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                        }`}
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CASH PAYMENT */}
            {method === 'Cash' && (
              <div className="space-y-3 pt-1 animate-fade-in">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-700 dark:text-slate-200 space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
                    <Banknote className="w-5 h-5 text-amber-500" />
                    Cash on Delivery / Pay at Counter
                  </div>
                  <p className="leading-relaxed">
                    No advance payment required. You can pay <strong>₹{Number(totalAmount).toLocaleString('en-IN')}</strong> in cash directly:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                    {orderType === 'Doorstep Delivery' ? (
                      <li>Pay the delivery partner in cash upon food arrival at your doorstep.</li>
                    ) : (
                      <li>Pay the restaurant staff in cash after dining at your reserved table.</li>
                    )}
                    <li>Exact change is welcomed, though change is provided.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 3: CARD PAYMENT */}
            {method === 'Card' && (
              <div className="space-y-3 pt-1 animate-fade-in">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="4532 8901 2345 6789"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono text-center"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      CVV / CVC
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      placeholder="•••"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono text-center"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Cardholder Full Name
                  </label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="e.g. Sourajit Santra"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

          </div>
        )}

        {/* Modal Bottom Action Bar */}
        {!paymentSuccess && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={processing}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleConfirmPayment}
              disabled={processing}
              className={`px-6 py-3 rounded-2xl text-white font-extrabold text-xs shadow-md flex items-center gap-2 transition-all disabled:opacity-50 ${
                method === 'Cash'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-glow'
                  : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-emerald-glow'
              }`}
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying QR / Payment...</span>
                </>
              ) : method === 'Cash' ? (
                <>
                  <Banknote className="w-4 h-4" />
                  <span>Confirm with Cash Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : method === 'QR' ? (
                <>
                  <QrCode className="w-4 h-4" />
                  <span>Scanned & Paid ₹{Number(totalAmount).toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Pay ₹{Number(totalAmount).toLocaleString('en-IN')} via Card</span>
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
