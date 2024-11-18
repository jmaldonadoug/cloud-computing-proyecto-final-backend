drop database cloud_computing_proyecto_final;
create database cloud_computing_proyecto_final;
use cloud_computing_proyecto_final;


create table libro (
	idlibro int  auto_increment primary key,
    nombre varchar(100) not null
);

create table editorial (
	ideditorial int auto_increment primary key,
    nombre varchar(100) not null
);

create table saga (
	idsaga int auto_increment primary key,
    nombre varchar(100) not null
);

create table genero (
	idgenero int auto_increment primary key,
    nombre varchar(100) not null
);

create table autor (
	idautor int auto_increment primary key,
    nombre varchar(100) not null,
    descripcion varchar(500),
    image varchar(100) not null default 'https://picsum.photos/185/274'
);

create table edicion (
	idedicion int auto_increment primary key,
    isbn varchar(100) not null,
    nombre varchar(100) not null,
    precio float not null,
    existencia int not null default 0,
    fecha_publicacion date not null,
    numero_paginas int not null,
    descripcion varchar(300) not null,
    image varchar(100) not null default 'https://picsum.photos/185/274',
    idlibro int not null,
    ideditorial int not null,
    idsaga int,
    foreign key(idlibro) references libro(idlibro),
    foreign key(ideditorial) references editorial(ideditorial),
    foreign key(idsaga) references saga(idsaga)
);

create table edicion_genero (
	idedicion_genero int auto_increment primary key,
    idedicion int not null,
    idgenero int not null,
    unique(idedicion, idgenero),
    foreign key(idedicion) references edicion(idedicion),
    foreign key(idgenero) references genero(idgenero)
);

create table edicion_autor (
	idedicion_autor int auto_increment primary key,
    idedicion int not null,
    idautor int not null,
    unique(idedicion, idautor),
    foreign key(idedicion) references edicion(idedicion),
    foreign key(idautor) references autor(idautor)
);

create table cliente (
	idcliente int auto_increment primary key,
    nit varchar(100) not null,
    nombre varchar(100) not null,
    correo varchar(100) not null,
    fecha_nacimiento date not null
);

create table proveedor (
	idproveedor int auto_increment primary key,
	nombre varchar(100) not null
);

create table venta (
	idventa int auto_increment primary key,
    fecha datetime,
    subtotal float,
    descuento float,
    total float,
    idcliente int,
    foreign key(idcliente) references cliente(idcliente)
);

create table venta_edicion (
	idventa_edicion int auto_increment primary key,
    cantidad int,
	total float,
    idventa int not null,
    idedicion int not null,
	foreign key(idventa) references venta(idventa),
    foreign key(idedicion) references edicion(idedicion)
);

create table compra (
	idcompra int auto_increment primary key,
    fecha datetime,
    total float default 0,
    idproveedor int,
    foreign key(idproveedor) references proveedor(idproveedor)
);

create table compra_edicion (
	idcompra_edicion int auto_increment primary key,
    cantidad int,
	total float,
    idcompra int not null,
    idedicion int not null,
	foreign key(idcompra) references compra(idcompra),
    foreign key(idedicion) references edicion(idedicion)
);

insert into editorial(nombre) values('Editorial 1');
insert into editorial(nombre) values('Editorial 2');
insert into editorial(nombre) values('Editorial 3');
insert into editorial(nombre) values('Editorial 4');
insert into editorial(nombre) values('Editorial 5');

insert into libro(nombre) values('Harry Potter y la piedra filosofal');
insert into libro(nombre) values('Harry Potter y la cámara secreta');
insert into libro(nombre) values('Harry Potter y el prisionero de azkaban');
insert into libro(nombre) values('Harry Potter y el cáliz de fuego');
insert into libro(nombre) values('Harry Potter y la orden del fénix');
insert into libro(nombre) values('El Principito');
insert into libro(nombre) values('Don quijote de la mancha');

insert into saga(nombre) values('Harry Potter');
insert into saga(nombre) values('Harry Potter: MinaLima Edition');

insert into genero(nombre) values('Aventura');
insert into genero(nombre) values('Comedia');
insert into genero(nombre) values('Ficción');
insert into genero(nombre) values('Fantasía');
insert into genero(nombre) values('Suspenso');
insert into genero(nombre) values('Superación');

insert into autor(nombre) values('editorialeditorialJ. K. Rowling');
insert into autor(nombre) values('MinaLima Design');
insert into autor(nombre) values('Antoine');
insert into autor(nombre) values('Miguel de Cervantes');

insert into edicion(isbn, nombre, precio, fecha_publicacion, numero_paginas, descripcion, image, idlibro, ideditorial, idsaga)
values('9780590353403', "Harry Potter y la piedra filosofal (Series #1)", 300, '1998-09-01', 320, 'asdf', 'https://picsum.photos/185/274', 1, 1, 1);
insert into edicion(isbn, nombre, precio, fecha_publicacion, numero_paginas, descripcion, image, idlibro, ideditorial, idsaga)
values('9780439064866', "Harry Potter y la cámara secreta (Series #2)", 300, '1999-07-01', 352, 'asdf', 'https://picsum.photos/185/274', 2, 1, 1);
insert into edicion(isbn, nombre, precio, fecha_publicacion, numero_paginas, descripcion, image, idlibro, ideditorial, idsaga)
values('9780439136358', "Harry Potter y el prisionero de azkaban (Series #3)", 300, '1999-10-01', 448, 'asdf', 'https://picsum.photos/185/274', 3, 1, 1);
insert into edicion(isbn, nombre, precio, fecha_publicacion, numero_paginas, descripcion, image, idlibro, ideditorial, idsaga)
values('9780439139595', "Harry Potter y el cáliz de fuego (Series #4)", 330, '2000-08-01', 752, 'asdf', 'https://picsum.photos/185/274', 4, 1, 1);
insert into edicion(isbn, nombre, precio, fecha_publicacion, numero_paginas, descripcion, image, idlibro, ideditorial, idsaga)
values('9780439358064', "Harry Potter y la orden del fénix (Series #5)", 330, '2003-07-01', 896, 'asdf', 'https://picsum.photos/185/274', 5, 1, 1);

insert into edicion(isbn, nombre, precio, fecha_publicacion, numero_paginas, descripcion, image, idlibro, ideditorial, idsaga)
values('9781338596700', "Harry Potter y la piedra filosofal (MinaLima Edition Series #1)", 380, '2020-10-20', 368, 'asdf', 'https://picsum.photos/185/274', 1, 2, 2);
insert into edicion(isbn, nombre, precio, fecha_publicacion, numero_paginas, descripcion, image, idlibro, ideditorial, idsaga)
values('9781338716535', "Harry Potter y la cámara secreta (MinaLima Edition Series #2)", 380, '2021-10-26', 400, 'asdf', 'https://picsum.photos/185/274', 2, 2, 2);
insert into edicion(isbn, nombre, precio, fecha_publicacion, numero_paginas, descripcion, image, idlibro, ideditorial, idsaga)
values('9781338815283', "Harry Potter y el prisionero de azkaban (MinaLima Edition Series #3)", 400, '2023-10-03', 480, 'asdf', 'https://picsum.photos/185/274', 3, 2, 2);

insert into edicion(isbn, nombre, precio, fecha_publicacion, numero_paginas, descripcion, image, idlibro, ideditorial)
values('9788419275479', "El Principito", 220, '2023-01-01', 104, 'asdf', 'https://picsum.photos/185/274', 6, 3);
insert into edicion(isbn, nombre, precio, fecha_publicacion, numero_paginas, descripcion, image, idlibro, ideditorial)
values('9788417826994', "Don quijote de la mancha", 180, '2022-01-01', 912, 'asdf', 'https://picsum.photos/185/274', 7, 4);
insert into edicion(isbn, nombre, precio, fecha_publicacion, numero_paginas, descripcion, image, idlibro, ideditorial)
values('9788420479873', "Don quijote de la mancha", 340, '2015-01-01', 1424, 'asdf', 'https://picsum.photos/185/274', 7, 5);


select * from edicion_genero;

SELECT e.*, l.nombre as lnombre, ed.nombre as ednombre, s.nombre as snombre FROM edicion e
inner join libro l on l.idlibro = e.idlibro
inner join editorial ed on ed.ideditorial = e.ideditorial
left outer join saga s on s.idsaga = e.idsaga
;

select * from edicion;
