document.addEventListener('DOMContentLoaded', function() {
   const table = document.querySelector('.table');
   const table_header = document.querySelector('#table_head');
   const header1 = document.querySelector('#header1');
   const header2 = document.querySelector('#header2');
   const header3 = document.querySelector('#header3');
   const header4 = document.querySelector('#header4');
   let table_body = document.querySelector('#table_body');
   
   const filtrFio = document.querySelector('#filtrFio');
   const filtrFaculty = document.querySelector('#filtrFaculty');
   const filtrBegin = document.querySelector('#filtrBegin');
   const filtrEnd = document.querySelector('#filtrEnd');

   const form = document.querySelector('.form');
    const surname = document.querySelector('#surname');
    const name = document.querySelector('#name');
    const patronymic = document.querySelector('#patronymic');
    const dateBirth = document.querySelector('#dateBirth');
    const yearAdmission = document.querySelector('#yearAdmission');
    const faculty = document.querySelector('#faculty');
    const messageError = document.querySelector('#messageError');
    messageError.style.color = 'red';
    const button = document.querySelector('.btn');
    let arrStudents = [];

    function fillTableFiltr(arrFiltr) {

        arrFiltr.forEach((student, index) => {
             let i = index+1
             let row_i = document.createElement('tr');
             let row_i_data_1 = document.createElement('td');
             row_i_data_1.innerHTML = student.surname + ' ' + student.name + ' ' + student.patronymic;
             let row_i_data_2 = document.createElement('td');
             row_i_data_2.innerHTML = student.faculty;
             let row_i_data_3 = document.createElement('td');
             let age = returnAge(student.dateBirth);
             row_i_data_3.innerHTML = student.dateBirth + '(' + age + " лет)";
             let row_i_data_4 = document.createElement('td');
             let course = getCourse(student.yearAdmission);
             row_i_data_4.innerHTML = course;
             row_i.appendChild(row_i_data_1);
             row_i.appendChild(row_i_data_2);
             row_i.appendChild(row_i_data_3);
             row_i.appendChild(row_i_data_4);
             table_body.appendChild(row_i);    
         })
     }
    function filtrFioFunction() {
        //const fio = '';
        const arrStudentsFiltr = arrStudents.filter(student =>
            //fio = student.surname + ' ' + student.name + ' ' + student.patronymic;
            student.surname.toLowerCase().includes(filtrFio.value.toLowerCase()) ||
            student.name.toLowerCase().includes(filtrFio.value.toLowerCase()) ||
            student.patronymic.toLowerCase().includes(filtrFio.value.toLowerCase())
            );
        clearTable();
        if (filtrFio.value === '') {
            fillTable();
        } else {
            fillTableFiltr(arrStudentsFiltr);
        }
    }
    function filtrFacultyFunction() {
        const arrStudentsFiltr = arrStudents.filter(student =>
            student.faculty.toLowerCase().includes(filtrFaculty.value.toLowerCase()));
        clearTable();
        if (filtrFaculty.value === '') {
            fillTable();
        } else {
            fillTableFiltr(arrStudentsFiltr);
        }
    }
    function filtrBeginFunction() {
        const arrStudentsFiltr = arrStudents.filter(student =>
            student.yearAdmission === filtrBegin.value);
        clearTable();
        if (filtrBegin.value === '') {
            fillTable();
        } else {
            fillTableFiltr(arrStudentsFiltr);
        }
    }
    function filtrEndFunction() {
        const arrStudentsFiltr = arrStudents.filter(student =>
            student.yearAdmission == (Number(filtrEnd.value)-4));
        clearTable();
        if (filtrEnd.value === '') {
            fillTable();
        } else {
            fillTableFiltr(arrStudentsFiltr);
        }
    }


    function getCourse(vYearAdmission) {
        let yearFinish = Number(vYearAdmission) + 4;
        let nowDate = new Date(Date.now());
       // let course = nowDate.getFullYear() - vYearAdmission + 1;
        let course = nowDate.getFullYear() - vYearAdmission;
        if (nowDate.getMonth() >= 8) {
            course++;
        }
        let strCourse = '';
        if (course <= 4) {
            strCourse = course + ' курс';
        } else {
            strCourse = 'закончен';
        }
        return vYearAdmission + '-' + yearFinish + '(' + strCourse + ")";

    }

    function returnAge(vDateBirth) {
        let birthDate = new Date(vDateBirth);
        let nowDate = new Date(Date.now());
        let age = nowDate.getFullYear() - birthDate.getFullYear();
        if (nowDate.getMonth() < birthDate.getMonth() || 
        nowDate.getMonth() == birthDate.getMonth() && nowDate.getDate() < birthDate.getDate()) {
            age--;
    }
        return age;
    }

    function clearTable() {
       /* while (table.table_body[0].rows[0]) {
            table.table_body[0].deleteRow(0);
        }*/
        let rowCount = table.rows.length;
        for (let i = 1; i < rowCount; i++) {
        //for (let i = rowCount; i >= 1; i--) {
        //for (let i = rowCount; i > 0; i--) {
            table.deleteRow(1);
        }
    }

    function fillTable() {

       // for (let index in arrStudents) {
        arrStudents.forEach((student, index) => {
            let i = index+1
            let row_i = document.createElement('tr');
            let row_i_data_1 = document.createElement('td');
            //row_i_data_1.innerHTML = "Гришко Олег Витальевич";
            row_i_data_1.innerHTML = student.surname + ' ' + student.name + ' ' + student.patronymic;
            let row_i_data_2 = document.createElement('td');
            //row_i_data_2.innerHTML = "ИСТ";
            row_i_data_2.innerHTML = student.faculty;
            let row_i_data_3 = document.createElement('td');
            //let age = Date.now() - student.dateBirth;
            let age = returnAge(student.dateBirth);
            //row_i_data_3.innerHTML = "17.11.1986 (35)";
            row_i_data_3.innerHTML = student.dateBirth + '(' + age + " лет)";
            let row_i_data_4 = document.createElement('td');
            //row_i_data_4.innerHTML = "2004 (1 курс)";
            let course = getCourse(student.yearAdmission);
            row_i_data_4.innerHTML = course;
            row_i.appendChild(row_i_data_1);
            row_i.appendChild(row_i_data_2);
            row_i.appendChild(row_i_data_3);
            row_i.appendChild(row_i_data_4);
            table_body.appendChild(row_i);    
        })
        // }

    }

    function validation() {
        let valid = 0;
        let birthDate = new Date(dateBirth.value);
        const lowDate = new Date(1900,0,01);
        const nowDate = new Date(Date.now());

        let strErr = '';
        if (birthDate > lowDate) {
            valid = 1;
        } else {
            strErr += "Слишком маленькая дата рождения";
            messageError.innerHTML = strErr;
            return valid;
        }
        if (birthDate <= nowDate) {
            valid = 1;
        } else {
            valid = 0;
            strErr += "Дата рождения превышает текущую дату";
            messageError.innerHTML = strErr;
            return valid;
        }

        if (yearAdmission.value >= 2000) {
            valid = 1;
        } else {
            valid = 0;
            strErr += "Слишком маленький год поступления";
            messageError.innerHTML = strErr;
            return valid;
        }
        if (yearAdmission.value <= nowDate.getFullYear()) {
            valid = 1;
        } else {
            valid = 0;
            strErr += "Слишком большой год поступления";
            messageError.innerHTML = strErr;
            return valid;
        }
        /*if (valid === 0) {
            messageError.innerHTML = strErr;
        }*/

        if (surname.value.trim() !== '') {
            valid = 1;
        } else {
            valid = 0;
            strErr += "Поле фамилия пустое";
            messageError.innerHTML = strErr;
            return valid;
        }
        if (name.value.trim() !== '') {
            valid = 1;
        } else {
            valid = 0;
            strErr += "Поле имя пустое";
            messageError.innerHTML = strErr;
            return valid;
        }
        if (patronymic.value.trim() !== '') {
            valid = 1;
        } else {
            valid = 0;
            strErr += "Поле отчество пустое";
            messageError.innerHTML = strErr;
            return valid;
        }
        if (yearAdmission.value.trim() !== '') {
            valid = 1;
        } else {
            valid = 0;
            strErr += "Поле год поступления пустое";
            messageError.innerHTML = strErr;
            return valid;
        }
        if (faculty.value.trim() !== '') {
            valid = 1;
        } else {
            valid = 0;
            strErr += "Поле факультет пустое";
            messageError.innerHTML = strErr;
            return valid;
        }

        return valid;
    }

    function sortFIO() {
        arrStudents.sort((a, b) => a.surname > b.surname ? 1 : -1);
        clearTable();
        fillTable();
    }
    function sortFaculty() {
        arrStudents.sort((a, b) => a.faculty > b.faculty ? 1 : -1);
        clearTable();
        fillTable();
    }
    function sortBirth() {
        arrStudents.sort((a, b) => a.dateBirth > b.dateBirth ? 1 : -1);
        clearTable();
        fillTable();
    }
    function sortYear() {
        arrStudents.sort((a, b) => a.yearAdmission > b.yearAdmission ? 1 : -1);
        clearTable();
        fillTable();
    }

    function addStudent(evt) {
        evt.preventDefault();
        
        if (validation() === 1) {
            //trimSurname = surname.value.trim();
            /*name: name.value,
            patronymic: patronymic.value,
            dateBirth: dateBirth.value,
            yearAdmission: yearAdmission.value,
            faculty: faculty.value*/
            arrStudents.push({
                surname: surname.value,
                //surname: trimSurname,
                name: name.value,
                patronymic: patronymic.value,
                dateBirth: dateBirth.value,
                yearAdmission: yearAdmission.value,
                faculty: faculty.value
            });
            clearTable();
            fillTable();
            surname.value = '';
            name.value = '';
            patronymic.value = '';
            dateBirth.value = '';
            yearAdmission.value = '';
            faculty.value = '';
            messageError.innerHTML = '';
        }


    }
    header1.addEventListener('click', sortFIO);
    header2.addEventListener('click', sortFaculty);
    header3.addEventListener('click', sortBirth);
    header4.addEventListener('click', sortYear);
    filtrFio.addEventListener('input', filtrFioFunction);
    filtrFaculty.addEventListener('input', filtrFacultyFunction);
    filtrBegin.addEventListener('input', filtrBeginFunction);
    filtrEnd.addEventListener('input', filtrEndFunction);
 

    //button.addEventListener('click', addStudent);
    form.addEventListener('submit', addStudent); 

    
})