"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Merchant = exports.Consumer = exports.AdditionalData = exports.Provider = exports.AdditionalDataID = exports.VietQRConsumerFieldID = exports.VietQRService = exports.ProviderFieldID = exports.FieldID = exports.QRProviderGUID = exports.QRProvider = void 0;
var QRProvider;
(function (QRProvider) {
    QRProvider["VIETQR"] = "VIETQR";
    QRProvider["VNPAY"] = "VNPAY";
})(QRProvider = exports.QRProvider || (exports.QRProvider = {}));
var QRProviderGUID;
(function (QRProviderGUID) {
    QRProviderGUID["VNPAY"] = "A000000775";
    QRProviderGUID["VIETQR"] = "A000000727";
})(QRProviderGUID = exports.QRProviderGUID || (exports.QRProviderGUID = {}));
var FieldID;
(function (FieldID) {
    FieldID["VERSION"] = "00";
    FieldID["INIT_METHOD"] = "01";
    FieldID["VNPAYQR"] = "26";
    FieldID["VIETQR"] = "38";
    FieldID["CATEGORY"] = "52";
    FieldID["CURRENCY"] = "53";
    FieldID["AMOUNT"] = "54";
    FieldID["TIP_AND_FEE_TYPE"] = "55";
    FieldID["TIP_AND_FEE_AMOUNT"] = "56";
    FieldID["TIP_AND_FEE_PERCENT"] = "57";
    FieldID["NATION"] = "58";
    FieldID["MERCHANT_NAME"] = "59";
    FieldID["CITY"] = "60";
    FieldID["ZIP_CODE"] = "61";
    FieldID["ADDITIONAL_DATA"] = "62";
    FieldID["CRC"] = "63";
})(FieldID = exports.FieldID || (exports.FieldID = {}));
var ProviderFieldID;
(function (ProviderFieldID) {
    ProviderFieldID["GUID"] = "00";
    ProviderFieldID["DATA"] = "01";
    ProviderFieldID["SERVICE"] = "02";
})(ProviderFieldID = exports.ProviderFieldID || (exports.ProviderFieldID = {}));
var VietQRService;
(function (VietQRService) {
    VietQRService["BY_ACCOUNT_NUMBER"] = "QRIBFTTA";
    VietQRService["BY_CARD_NUMBER"] = "QRIBFTTC";
})(VietQRService = exports.VietQRService || (exports.VietQRService = {}));
var VietQRConsumerFieldID;
(function (VietQRConsumerFieldID) {
    VietQRConsumerFieldID["BANK_BIN"] = "00";
    VietQRConsumerFieldID["BANK_NUMBER"] = "01";
})(VietQRConsumerFieldID = exports.VietQRConsumerFieldID || (exports.VietQRConsumerFieldID = {}));
var AdditionalDataID;
(function (AdditionalDataID) {
    AdditionalDataID["BILL_NUMBER"] = "01";
    AdditionalDataID["MOBILE_NUMBER"] = "02";
    AdditionalDataID["STORE_LABEL"] = "03";
    AdditionalDataID["LOYALTY_NUMBER"] = "04";
    AdditionalDataID["REFERENCE_LABEL"] = "05";
    AdditionalDataID["CUSTOMER_LABEL"] = "06";
    AdditionalDataID["TERMINAL_LABEL"] = "07";
    AdditionalDataID["PURPOSE_OF_TRANSACTION"] = "08";
    AdditionalDataID["ADDITIONAL_CONSUMER_DATA_REQUEST"] = "09";
})(AdditionalDataID = exports.AdditionalDataID || (exports.AdditionalDataID = {}));
class Provider {
}
exports.Provider = Provider;
class AdditionalData {
}
exports.AdditionalData = AdditionalData;
class Consumer {
}
exports.Consumer = Consumer;
class Merchant {
}
exports.Merchant = Merchant;
