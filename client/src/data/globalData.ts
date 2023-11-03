interface DeleteProps {
    deleted: string,
    deleteBtn: string,
    cancel: string,
    content: string,
    header: string,
    state: string,
}

export interface User {
    id: string,
    lastName: string,
    firstName: string,
    email: string,
    firstWorkDay: string,
    position: string,
    team: string,
    role: string
}
interface Login_Page{
    submit: string,
    title: string,
    subTitle: string,
}

interface Personal_Info{
    firstName: string,
    lastName: string,
    email: string,
    firstWorkDay: string,
    position: string,
    team: string
}

interface List_Info{
    Num: string,
    lastName: string,
    firstName: string,
    team: string,
    leaveType: string,
    createdDate: string,
    leaveHour: string,
    approvedBy: string,
    modifiedDate: string,
    state: string,
}


interface Side_Titles{
    first: {
        title: string,
        path: string,
    },second: {
        title: string,
        path: string,
    },third: {
        title: string,
        path: string,
    },
}

interface Top_Titles{
    logout: string
}

interface Employee_Info{
    header: string,
    hashTag: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    team: string,
    position: string,
    firstWorkDay: string,
}


export interface RequestModel{
    error:"error" | "success" | "info" | "warning" | "loading" | undefined,
    success:"error" | "success" | "info" | "warning" | "loading" | undefined,
    unsupportedError:string
}

export const LoginRequest : RequestModel = {
    error:"error",
    success:"success",
    unsupportedError:"An error occurred"
}

export const PersonalInfo: Personal_Info = {
    firstName: "Нэр:",
    lastName: "Овог:",
    email: "Цахим хаяг:",
    firstWorkDay: "Ажилд орсон огноо:",    
    position: "Албан тушаал:",
    team: "Баг:",
}


export const SideTitles: Side_Titles = {
    first: {
        title: "Амралт, чөлөө",
        path: "/",
    },
    second: {
        title: "Ажилчдын мэдээлэл",
        path: "/info",
    },
    third: {
        title: "Чөлөөний түүх",
        path: "/history",
    },
}

export const TopTitles: Top_Titles = {
    logout: "Гарах",
}
export const LoginPage: Login_Page = {
    submit: "Нэвтрэх",
    title: "Leaderboard",
    subTitle: "Systems",
}

export const EmployeeInfo : Employee_Info= {
    header: "Ажилчдын мэдээлэл",
    hashTag: "#",
    firstName: "Овог",
    lastName: "Нэр",
    email: "Цахим хаяг",
    role: "Дүр",
    team: "Баг",
    position: "Албан тушаал",
    firstWorkDay: "Ажилд орсон огноо"
}

export const ListInfo: List_Info = {
    Num: "#",
    lastName: "Овог",
    firstName: "Нэр",
    team: "Баг",
    leaveType: "Төрөл",
    createdDate: "Үүссэн огноо",
    leaveHour: "Авсан цаг",
    approvedBy: "Батлах менежер",
    modifiedDate: "Авсан огноо",
    state: "Төлөв"
}

export const DELETE_PROPS: DeleteProps = {
    deleted: 'Амжилттай устлаа',
    deleteBtn: 'Устгах',
    state: "NEW",
    cancel: 'Болих',
    header: 'Чөлөөний хүсэлт устгах',
    content: 'Та энэхүү чөлөөний хүсэлтийг устгахдаа итгэлтэй байна уу? Уг үйлдэл нь буцаагдах боломжгүй тул сайтар шалгана уу.'
}

interface AbsenceHistory{
    header: string,
    checkBox: string,
    orderHeader: string,
    lastNameHeader: string,
    firstNameHeader: string,
    teamHeader: string,
    typeHeader: string,
    createdDateHeader: string,
    hourHeader: string,
    managerNameHeader: string,
    dateHeader: string,
    stateHeader: string,
}

export const ABSENCE_HISTORY : AbsenceHistory = {
    header: "Чөлөөний түүх",
    checkBox: "Бүх хүсэлтийг харах",
    orderHeader: "#",
    lastNameHeader: "Овог", 
    firstNameHeader: "Нэр",
    teamHeader: "Баг",
    typeHeader: "Төрөл",
    createdDateHeader: "Үүссэн огноо",
    hourHeader: "Авсан цаг",
    managerNameHeader: "Батлах менежер",
    dateHeader: "Авсан огноо",
    stateHeader: "Төлөв"
}
interface ApiUrl {
    main: string,
}

export const API_URL : ApiUrl = {
    main: "http://192.168.50.68:8000",

}

interface LeaveRequest {
    header: string,
    leaveType: string,
    leaveTypePlaceholder: string,
    leaveDate: string,
    leaveHour: string,
    leaveRequestManager: string,
    leaveRequestManagerPlaceholder: string,
    leaveRequestBtn: string,
    cancelbtn: string,
    submitBtn: string,
}

export const LEAVE_REQUEST : LeaveRequest = {
    header: "Чөлөөний хүсэлт",
    leaveType: "Чөлөөний төрөл:",
    leaveTypePlaceholder: "Чөлөөний төрөл сонгоно уу!",
    leaveDate: "Чөлөө авах огноо:",
    leaveHour: "Чөлөө авах цаг:",
    leaveRequestManager: "Чөлөөний хүсэлт илгээх менежер:",
    leaveRequestManagerPlaceholder: "Менежер сонгоно уу!",
    leaveRequestBtn: "Чөлөө авах",
    cancelbtn: "Болих",
    submitBtn: "Илгээх",
}

interface LeaveResponse {
    onSuccess: {
        title: string,
        description: string,
    },
    onError: {
        title: string,
        description: string,
    }
}

export const LEAVE_RESPONSE : LeaveResponse = {
    onSuccess: {
        title: "Aмжилттай хадгалагдлаа.",
        description: "Чөлөөний хүсэлт илгээгдсэн.",
    },
    onError: {
        title: "Амжилтгүй",
        description: "Хүсэлт илгээгдсэнгүй.",
    }
}