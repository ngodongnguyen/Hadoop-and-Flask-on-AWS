"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banks = exports.BanksObject = exports.VietQRStatus = void 0;
const bank_code_1 = require("./bank-code");
const bank_key_1 = require("./bank-key");
var VietQRStatus;
(function (VietQRStatus) {
    VietQRStatus[VietQRStatus["NOT_SUPPORTED"] = -1] = "NOT_SUPPORTED";
    VietQRStatus[VietQRStatus["RECEIVE_ONLY"] = 0] = "RECEIVE_ONLY";
    VietQRStatus[VietQRStatus["TRANSFER_SUPPORTED"] = 1] = "TRANSFER_SUPPORTED";
})(VietQRStatus = exports.VietQRStatus || (exports.VietQRStatus = {}));
exports.BanksObject = {
    [bank_key_1.BankKey.ABBANK]: {
        key: bank_key_1.BankKey.ABBANK,
        code: bank_code_1.BankCode.ABBANK,
        name: 'Ngân hàng TMCP An Bình',
        bin: '970425',
        shortName: 'AB Bank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'ABBKVNVX',
        keywords: 'anbinh'
    },
    [bank_key_1.BankKey.ACB]: {
        key: bank_key_1.BankKey.ACB,
        code: bank_code_1.BankCode.ACB,
        name: 'Ngân hàng TMCP Á Châu',
        bin: '970416',
        shortName: 'ACB',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'ASCBVNVX',
        keywords: 'achau'
    },
    [bank_key_1.BankKey.AGRIBANK]: {
        key: bank_key_1.BankKey.AGRIBANK,
        code: bank_code_1.BankCode.AGRIBANK,
        name: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam',
        bin: '970405',
        shortName: 'Agribank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'VBAAVNVX',
        keywords: 'nongnghiep, nongthon, agribank, agri'
    },
    [bank_key_1.BankKey.BAC_A_BANK]: {
        key: bank_key_1.BankKey.BAC_A_BANK,
        code: bank_code_1.BankCode.BAC_A_BANK,
        name: 'Ngân hàng TMCP Bắc Á',
        bin: '970409',
        shortName: 'BacA Bank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'NASCVNVX',
        keywords: 'baca, NASB'
    },
    [bank_key_1.BankKey.BAOVIET_BANK]: {
        key: bank_key_1.BankKey.BAOVIET_BANK,
        code: bank_code_1.BankCode.BAOVIET_BANK,
        name: 'Ngân hàng TMCP Bảo Việt',
        bin: '970438',
        shortName: 'BaoViet Bank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'BVBVVNVX',
        keywords: 'baoviet, BVB'
    },
    [bank_key_1.BankKey.BANVIET]: {
        key: bank_key_1.BankKey.BANVIET,
        code: bank_code_1.BankCode.BANVIET,
        name: 'Ngân hàng TMCP Bản Việt',
        bin: '970454',
        shortName: 'BVBank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'VCBCVNVX',
        keywords: 'banviet, vietcapitalbank'
    },
    [bank_key_1.BankKey.BIDC]: {
        key: bank_key_1.BankKey.BIDC,
        code: bank_code_1.BankCode.BIDC,
        name: 'Ngân hàng TMCP Đầu tư và Phát triển Campuchia',
        bin: '',
        shortName: 'BIDC',
        vietQRStatus: VietQRStatus.NOT_SUPPORTED
    },
    [bank_key_1.BankKey.BIDV]: {
        key: bank_key_1.BankKey.BIDV,
        code: bank_code_1.BankCode.BIDV,
        name: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
        bin: '970418',
        shortName: 'BIDV',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'BIDVVNVX'
    },
    [bank_key_1.BankKey.CAKE]: {
        key: bank_key_1.BankKey.CAKE,
        code: bank_code_1.BankCode.CAKE,
        name: 'Ngân hàng số CAKE by VPBank - Ngân hàng TMCP Việt Nam Thịnh Vượng',
        bin: '546034',
        shortName: 'CAKE by VPBank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: null
    },
    [bank_key_1.BankKey.CBBANK]: {
        key: bank_key_1.BankKey.CBBANK,
        code: bank_code_1.BankCode.CBBANK,
        name: 'Ngân hàng Thương mại TNHH MTV Xây dựng Việt Nam',
        bin: '970444',
        shortName: 'CB Bank',
        vietQRStatus: VietQRStatus.RECEIVE_ONLY,
        lookupSupported: 1,
        swiftCode: 'GTBAVNVX',
        keywords: 'xaydungvn, xaydung'
    },
    [bank_key_1.BankKey.CIMB]: {
        key: bank_key_1.BankKey.CIMB,
        code: bank_code_1.BankCode.CIMB,
        name: 'Ngân hàng TNHH MTV CIMB Việt Nam',
        bin: '422589',
        shortName: 'CIMB Bank',
        vietQRStatus: VietQRStatus.RECEIVE_ONLY,
        lookupSupported: 1,
        swiftCode: 'CIBBVNVN',
        keywords: 'cimbvn'
    },
    [bank_key_1.BankKey.COOP_BANK]: {
        key: bank_key_1.BankKey.COOP_BANK,
        code: bank_code_1.BankCode.COOP_BANK,
        name: 'Ngân hàng Hợp tác xã Việt Nam',
        bin: '970446',
        shortName: 'Co-op Bank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: null,
        keywords: 'hoptacxa, coop'
    },
    [bank_key_1.BankKey.DBS_BANK]: {
        key: bank_key_1.BankKey.DBS_BANK,
        code: bank_code_1.BankCode.DBS_BANK,
        name: 'NH TNHH MTV Phát triển Singapore - Chi nhánh TP. Hồ Chí Minh',
        bin: '796500',
        shortName: 'DBS Bank',
        vietQRStatus: VietQRStatus.RECEIVE_ONLY,
        lookupSupported: 0,
        swiftCode: 'DBSSVNVX',
        keywords: 'dbshcm'
    },
    [bank_key_1.BankKey.DONG_A_BANK]: {
        key: bank_key_1.BankKey.DONG_A_BANK,
        code: bank_code_1.BankCode.DONG_A_BANK,
        name: 'Ngân hàng TMCP Đông Á',
        bin: '970406',
        shortName: 'DongA Bank',
        vietQRStatus: VietQRStatus.RECEIVE_ONLY,
        lookupSupported: 1,
        swiftCode: 'EACBVNVX',
        keywords: 'donga, DAB'
    },
    [bank_key_1.BankKey.EXIMBANK]: {
        key: bank_key_1.BankKey.EXIMBANK,
        code: bank_code_1.BankCode.EXIMBANK,
        name: 'Ngân hàng TMCP Xuất Nhập khẩu Việt Nam',
        bin: '970431',
        shortName: 'Eximbank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'EBVIVNVX'
    },
    [bank_key_1.BankKey.GPBANK]: {
        key: bank_key_1.BankKey.GPBANK,
        code: bank_code_1.BankCode.GPBANK,
        name: 'Ngân hàng Thương mại TNHH MTV Dầu Khí Toàn Cầu',
        bin: '970408',
        shortName: 'GPBank',
        vietQRStatus: VietQRStatus.RECEIVE_ONLY,
        lookupSupported: 1,
        swiftCode: 'GBNKVNVX',
        keywords: 'daukhi'
    },
    [bank_key_1.BankKey.HDBANK]: {
        key: bank_key_1.BankKey.HDBANK,
        code: bank_code_1.BankCode.HDBANK,
        name: 'Ngân hàng TMCP Phát triển TP. Hồ Chí Minh',
        bin: '970437',
        shortName: 'HDBank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'HDBCVNVX'
    },
    [bank_key_1.BankKey.HONGLEONG_BANK]: {
        key: bank_key_1.BankKey.HONGLEONG_BANK,
        code: bank_code_1.BankCode.HONGLEONG_BANK,
        name: 'Ngân hàng TNHH MTV Hong Leong Việt Nam',
        bin: '970442',
        shortName: 'HongLeong Bank',
        vietQRStatus: VietQRStatus.RECEIVE_ONLY,
        lookupSupported: 1,
        swiftCode: 'HLBBVNVX',
        keywords: 'HLBVN'
    },
    [bank_key_1.BankKey.HSBC]: {
        key: bank_key_1.BankKey.HSBC,
        code: bank_code_1.BankCode.HSBC,
        name: 'Ngân hàng TNHH MTV HSBC (Việt Nam)',
        bin: '458761',
        shortName: 'HSBC Vietnam',
        vietQRStatus: VietQRStatus.RECEIVE_ONLY,
        lookupSupported: 1,
        swiftCode: 'HSBCVNVX'
    },
    [bank_key_1.BankKey.IBK_HCM]: {
        key: bank_key_1.BankKey.IBK_HCM,
        code: bank_code_1.BankCode.IBK_HCM,
        name: 'Ngân hàng Công nghiệp Hàn Quốc - Chi nhánh TP. Hồ Chí Minh',
        bin: '970456',
        shortName: 'IBK HCM',
        vietQRStatus: VietQRStatus.RECEIVE_ONLY,
        lookupSupported: 0,
        swiftCode: null,
        keywords: 'congnghiep'
    },
    [bank_key_1.BankKey.IBK_HN]: {
        key: bank_key_1.BankKey.IBK_HN,
        code: bank_code_1.BankCode.IBK_HN,
        name: 'Ngân hàng Công nghiệp Hàn Quốc - Chi nhánh Hà Nội',
        bin: '970455',
        shortName: 'IBK HN',
        vietQRStatus: VietQRStatus.RECEIVE_ONLY,
        lookupSupported: 0,
        swiftCode: null,
        keywords: 'congnghiep'
    },
    [bank_key_1.BankKey.INDOVINA_BANK]: {
        key: bank_key_1.BankKey.INDOVINA_BANK,
        code: bank_code_1.BankCode.INDOVINA_BANK,
        name: 'Ngân hàng TNHH Indovina',
        bin: '970434',
        shortName: 'Indovina Bank',
        vietQRStatus: VietQRStatus.RECEIVE_ONLY,
        lookupSupported: 1,
        swiftCode: null
    },
    [bank_key_1.BankKey.KASIKORN_BANK]: {
        key: bank_key_1.BankKey.KASIKORN_BANK,
        code: bank_code_1.BankCode.KASIKORN_BANK,
        name: 'Ngân hàng Đại chúng TNHH KASIKORNBANK - CN TP. Hồ Chí Minh',
        bin: '668888',
        shortName: 'Kasikornbank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'KASIVNVX'
    },
    [bank_key_1.BankKey.KIENLONG_BANK]: {
        key: bank_key_1.BankKey.KIENLONG_BANK,
        code: bank_code_1.BankCode.KIENLONG_BANK,
        name: 'Ngân hàng TMCP Kiên Long',
        bin: '970452',
        shortName: 'KienlongBank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'KLBKVNVX'
    },
    [bank_key_1.BankKey.KOOKMIN_BANK_HCM]: {
        key: bank_key_1.BankKey.KOOKMIN_BANK_HCM,
        code: bank_code_1.BankCode.KOOKMIN_BANK_HCM,
        name: 'Ngân hàng Kookmin - Chi nhánh TP. Hồ Chí Minh',
        bin: '970463',
        shortName: 'Kookmin Bank HCM',
        vietQRStatus: VietQRStatus.RECEIVE_ONLY,
        lookupSupported: 0,
        swiftCode: null
    },
    [bank_key_1.BankKey.KOOKMIN_BANK_HN]: {
        key: bank_key_1.BankKey.KOOKMIN_BANK_HN,
        code: bank_code_1.BankCode.KOOKMIN_BANK_HN,
        name: 'Ngân hàng Kookmin - Chi nhánh Hà Nội',
        bin: '970462',
        shortName: 'Kookmin Bank HN',
        vietQRStatus: VietQRStatus.RECEIVE_ONLY,
        lookupSupported: 0,
        swiftCode: null
    },
    [bank_key_1.BankKey.LIENVIETPOST_BANK]: {
        key: bank_key_1.BankKey.LIENVIETPOST_BANK,
        code: bank_code_1.BankCode.LIENVIETPOST_BANK,
        name: 'Ngân hàng TMCP Bưu Điện Liên Việt',
        bin: '970449',
        shortName: 'LienVietPostBank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'LVBKVNVX',
        keywords: 'lienvietbank'
    },
    [bank_key_1.BankKey.MBBANK]: {
        key: bank_key_1.BankKey.MBBANK,
        code: bank_code_1.BankCode.MBBANK,
        name: 'Ngân hàng TMCP Quân đội',
        bin: '970422',
        shortName: 'MB Bank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'MSCBVNVX'
    },
    [bank_key_1.BankKey.MSB]: {
        key: bank_key_1.BankKey.MSB,
        code: bank_code_1.BankCode.MSB,
        name: 'Ngân hàng TMCP Hàng Hải',
        bin: '970426',
        shortName: 'MSB',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'MCOBVNVX',
        keywords: 'hanghai'
    },
    [bank_key_1.BankKey.NAM_A_BANK]: {
        key: bank_key_1.BankKey.NAM_A_BANK,
        code: bank_code_1.BankCode.NAM_A_BANK,
        name: 'Ngân hàng TMCP Nam Á',
        bin: '970428',
        shortName: 'Nam A Bank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'NAMAVNVX',
        keywords: 'namabank'
    },
    [bank_key_1.BankKey.NCB]: {
        key: bank_key_1.BankKey.NCB,
        code: bank_code_1.BankCode.NCB,
        name: 'Ngân hàng TMCP Quốc Dân',
        bin: '970419',
        shortName: 'NCB Bank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'NVBAVNVX',
        keywords: 'quocdan'
    },
    [bank_key_1.BankKey.NONGHYUP_BANK_HN]: {
        key: bank_key_1.BankKey.NONGHYUP_BANK_HN,
        code: bank_code_1.BankCode.NONGHYUP_BANK_HN,
        name: 'Ngân hàng Nonghyup - Chi nhánh Hà Nội',
        bin: '801011',
        shortName: 'Nonghyup Bank',
        vietQRStatus: VietQRStatus.RECEIVE_ONLY,
        lookupSupported: 0,
        swiftCode: null
    },
    [bank_key_1.BankKey.OCB]: {
        key: bank_key_1.BankKey.OCB,
        code: bank_code_1.BankCode.OCB,
        name: 'Ngân hàng TMCP Phương Đông',
        bin: '970448',
        shortName: 'OCB Bank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'ORCOVNVX',
        keywords: 'phuongdong'
    },
    [bank_key_1.BankKey.OCEANBANK]: {
        key: bank_key_1.BankKey.OCEANBANK,
        code: bank_code_1.BankCode.OCEANBANK,
        name: 'Ngân hàng Thương mại TNHH MTV Đại Dương',
        bin: '970414',
        shortName: 'Ocean Bank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'OCBKUS3M',
        keywords: 'daiduong'
    },
    [bank_key_1.BankKey.PGBANK]: {
        key: bank_key_1.BankKey.PGBANK,
        code: bank_code_1.BankCode.PGBANK,
        name: 'Ngân hàng TMCP Xăng dầu Petrolimex',
        bin: '970430',
        shortName: 'PG Bank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'PGBLVNVX'
    },
    [bank_key_1.BankKey.PUBLIC_BANK]: {
        key: bank_key_1.BankKey.PUBLIC_BANK,
        code: bank_code_1.BankCode.PUBLIC_BANK,
        name: 'Ngân hàng TNHH MTV Public Việt Nam',
        bin: '970439',
        shortName: 'Public Bank Vietnam',
        vietQRStatus: VietQRStatus.RECEIVE_ONLY,
        lookupSupported: 1,
        swiftCode: 'VIDPVNVX',
        keywords: 'publicvn'
    },
    [bank_key_1.BankKey.PVCOM_BANK]: {
        key: bank_key_1.BankKey.PVCOM_BANK,
        code: bank_code_1.BankCode.PVCOM_BANK,
        name: 'Ngân hàng TMCP Đại Chúng Việt Nam',
        bin: '970412',
        shortName: 'PVcomBank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'WBVNVNVX',
        keywords: 'daichung'
    },
    [bank_key_1.BankKey.SACOMBANK]: {
        key: bank_key_1.BankKey.SACOMBANK,
        code: bank_code_1.BankCode.SACOMBANK,
        name: 'Ngân hàng TMCP Sài Gòn Thương Tín',
        bin: '970403',
        shortName: 'Sacombank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'SGTTVNVX'
    },
    [bank_key_1.BankKey.SAIGONBANK]: {
        key: bank_key_1.BankKey.SAIGONBANK,
        code: bank_code_1.BankCode.SAIGONBANK,
        name: 'Ngân hàng TMCP Sài Gòn Công Thương',
        bin: '970400',
        shortName: 'SaigonBank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'SBITVNVX',
        keywords: 'saigoncongthuong, saigonbank'
    },
    [bank_key_1.BankKey.SCB]: {
        key: bank_key_1.BankKey.SCB,
        code: bank_code_1.BankCode.SCB,
        name: 'Ngân hàng TMCP Sài Gòn',
        bin: '970429',
        shortName: 'SCB',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'SACLVNVX',
        keywords: 'saigon'
    },
    [bank_key_1.BankKey.SEA_BANK]: {
        key: bank_key_1.BankKey.SEA_BANK,
        code: bank_code_1.BankCode.SEA_BANK,
        name: 'Ngân hàng TMCP Đông Nam Á',
        bin: '970440',
        shortName: 'SeABank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'SEAVVNVX'
    },
    [bank_key_1.BankKey.SHB]: {
        key: bank_key_1.BankKey.SHB,
        code: bank_code_1.BankCode.SHB,
        name: 'Ngân hàng TMCP Sài Gòn - Hà Nội',
        bin: '970443',
        shortName: 'SHB',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'SHBAVNVX',
        keywords: 'saigonhanoi, sghn'
    },
    [bank_key_1.BankKey.SHINHAN_BANK]: {
        key: bank_key_1.BankKey.SHINHAN_BANK,
        code: bank_code_1.BankCode.SHINHAN_BANK,
        name: 'Ngân hàng TNHH MTV Shinhan Việt Nam',
        bin: '970424',
        shortName: 'Shinhan Bank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'SHBKVNVX'
    },
    [bank_key_1.BankKey.STANDARD_CHARTERED_BANK]: {
        key: bank_key_1.BankKey.STANDARD_CHARTERED_BANK,
        code: bank_code_1.BankCode.STANDARD_CHARTERED_BANK,
        name: 'Ngân hàng TNHH MTV Standard Chartered Bank Việt Nam',
        bin: '970410',
        shortName: 'Standard Chartered Vietnam',
        vietQRStatus: VietQRStatus.RECEIVE_ONLY,
        lookupSupported: 1,
        swiftCode: 'SCBLVNVX'
    },
    [bank_key_1.BankKey.TECHCOMBANK]: {
        key: bank_key_1.BankKey.TECHCOMBANK,
        code: bank_code_1.BankCode.TECHCOMBANK,
        name: 'Ngân hàng TMCP Kỹ thương Việt Nam',
        bin: '970407',
        shortName: 'Techcombank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'VTCBVNVX'
    },
    [bank_key_1.BankKey.TIMO]: {
        key: bank_key_1.BankKey.TIMO,
        code: bank_code_1.BankCode.TIMO,
        name: 'Ngân hàng số Timo by Bản Việt Bank',
        bin: '963388',
        shortName: 'Timo',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 0,
        swiftCode: null,
        keywords: 'banviet'
    },
    [bank_key_1.BankKey.TPBANK]: {
        key: bank_key_1.BankKey.TPBANK,
        code: bank_code_1.BankCode.TPBANK,
        name: 'Ngân hàng TMCP Tiên Phong',
        bin: '970423',
        shortName: 'TPBank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'TPBVVNVX',
        keywords: 'tienphong'
    },
    [bank_key_1.BankKey.UBANK]: {
        key: bank_key_1.BankKey.UBANK,
        code: bank_code_1.BankCode.UBANK,
        name: 'Ngân hàng số Ubank by VPBank - Ngân hàng TMCP Việt Nam Thịnh Vượng',
        bin: '546035',
        shortName: 'Ubank by VPBank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: null
    },
    [bank_key_1.BankKey.UNITED_OVERSEAS_BANK]: {
        key: bank_key_1.BankKey.UNITED_OVERSEAS_BANK,
        code: bank_code_1.BankCode.UNITED_OVERSEAS_BANK,
        name: 'Ngân hàng United Overseas Bank Việt Nam',
        bin: '970458',
        shortName: 'United Overseas Bank Vietnam',
        vietQRStatus: VietQRStatus.RECEIVE_ONLY,
        lookupSupported: 1,
        swiftCode: null
    },
    [bank_key_1.BankKey.VIB]: {
        key: bank_key_1.BankKey.VIB,
        code: bank_code_1.BankCode.VIB,
        name: 'Ngân hàng TMCP Quốc tế Việt Nam',
        bin: '970441',
        shortName: 'VIB',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'VNIBVNVX',
        keywords: 'quocte'
    },
    [bank_key_1.BankKey.VIET_A_BANK]: {
        key: bank_key_1.BankKey.VIET_A_BANK,
        code: bank_code_1.BankCode.VIET_A_BANK,
        name: 'Ngân hàng TMCP Việt Á',
        bin: '970427',
        shortName: 'VietABank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'VNACVNVX'
    },
    [bank_key_1.BankKey.VIET_BANK]: {
        key: bank_key_1.BankKey.VIET_BANK,
        code: bank_code_1.BankCode.VIET_BANK,
        name: 'Ngân hàng TMCP Việt Nam Thương Tín',
        bin: '970433',
        shortName: 'VietBank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'VNTTVNVX',
        keywords: 'vietnamthuongtin, vnthuongtin'
    },
    [bank_key_1.BankKey.VIETCOMBANK]: {
        key: bank_key_1.BankKey.VIETCOMBANK,
        code: bank_code_1.BankCode.VIETCOMBANK,
        name: 'Ngân hàng TMCP Ngoại Thương Việt Nam',
        bin: '970436',
        shortName: 'Vietcombank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'BFTVVNVX'
    },
    [bank_key_1.BankKey.VIETINBANK]: {
        key: bank_key_1.BankKey.VIETINBANK,
        code: bank_code_1.BankCode.VIETINBANK,
        name: 'Ngân hàng TMCP Công thương Việt Nam',
        bin: '970415',
        shortName: 'VietinBank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'ICBVVNVX',
        keywords: 'viettin'
    },
    [bank_key_1.BankKey.VPBANK]: {
        key: bank_key_1.BankKey.VPBANK,
        code: bank_code_1.BankCode.VPBANK,
        name: 'Ngân hàng TMCP Việt Nam Thịnh Vượng',
        bin: '970432',
        shortName: 'VPBank',
        vietQRStatus: VietQRStatus.TRANSFER_SUPPORTED,
        lookupSupported: 1,
        swiftCode: 'VPBKVNVX',
        keywords: 'vnthinhvuong'
    },
    [bank_key_1.BankKey.VRB]: {
        key: bank_key_1.BankKey.VRB,
        code: bank_code_1.BankCode.VRB,
        name: 'Ngân hàng Liên doanh Việt - Nga',
        bin: '970421',
        shortName: 'VietNgaBank',
        vietQRStatus: VietQRStatus.RECEIVE_ONLY,
        lookupSupported: 1,
        swiftCode: null,
        keywords: 'vietnam-russia, vrbank'
    },
    [bank_key_1.BankKey.WOORI_BANK]: {
        key: bank_key_1.BankKey.WOORI_BANK,
        code: bank_code_1.BankCode.WOORI_BANK,
        name: 'Ngân hàng TNHH MTV Woori Việt Nam',
        bin: '970457',
        shortName: 'Woori Bank',
        vietQRStatus: VietQRStatus.RECEIVE_ONLY,
        lookupSupported: 1,
        swiftCode: null
    }
};
exports.Banks = Object.values(exports.BanksObject);
