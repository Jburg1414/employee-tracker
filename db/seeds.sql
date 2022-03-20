INSERT INTO department (name) VALUES ('HR'), ('Sales'), ('Management'), ('Technicians');

INSERT INTO role (title, salary, department_id) VALUES ('Director', 150000, 1), ('Representative', 85000, 1), ('Senior', 130000, 2), ('Middle', 75000, 2), ('Upper', 250000, 3), ('Lower', 145000, 3), ('Master', 13000, 4), ('Middle', 65000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jim', 'Bob', 1, NULL), ('John', 'Johnson', 2, 1), ('James', 'Dean', 3, NULL), ('William', 'Henry', 4, 3), ('Jimmy', 'Lee', 5, NULL), ('Jack', 'Eddy', 6, 5), ('Ricky', 'Bobby', 7, 6), ('Dan', 'Rosario', 8, 6);