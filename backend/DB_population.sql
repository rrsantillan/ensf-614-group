DROP DATABASE IF EXISTS ensf_614;
CREATE DATABASE ensf_614;
USE ensf_614;

DROP TABLE IF EXISTS USERTABLE;
CREATE TABLE usertable (
	USERNAME			varchar(25) NOT null,
	PASSWORD			varchar(25) NOT null,
	EMAIL				varchar(25),
	DOB				varchar(25),				
	primary key (USERNAME)
);
		
DROP TABLE IF FLIGHTS EXISTS ;
CREATE TABLE flights (    
	FLIGHTID			varchar(25) NOT null,
	SOURCE			varchar(25) NOT null,
	DESTINATION		varchar(25) NOT null,
	DEPARTURE		varchar(25),
	LANDING 			varchar(25),				
	primary key (FLIGHTID)  
);

DROP TABLE IF EXISTS REGISTEREDTICKETS; 
CREATE TABLE REGISTEREDTICKETS (
	USERNAME			varchar(25) NOT null,
	FLIGHTID			varchar(25) NOT null,
	SEATNUMBER			varchar(25) NOT null,
	primary key (USERNAME),
	primary key (SEATNUMBER)  
);

DROP TABLE IF EXISTS CREW; 
CREATE TABLE CREW (
	FNAME			varchar(25) NOT null,
	LASTNAME			varchar(25) NOT null,
	CREWID			varchar(25) NOT null,
	primary key (CREWID),
);

DROP TABLE IF EXISTS ASSIGNEDCREW; 
CREATE TABLE ASSIGNEDCREW (
	FLIGHTID			varchar(25) NOT null,
	CREWID			varchar(25) NOT null,
	primary key (FLIGHTID),
	primary key (CREWID)  
);

DROP TABLE IF EXISTS CREW; 
CREATE TABLE CREW (
	FNAME			varchar(25) NOT null,
	LASTNAME			varchar(25) NOT null,
	ID			varchar(25) NOT null,
	primary key (USERNAME),
	primary key (SEATNUMBER)  
);


INSERT INTO USERTABLE (USERNAME, PASSWORD, EMAIL, DOB)
VALUES
('Braden', 'Tink19', 'braden@gmail.com',	'1969-10-17'),
('Fred', 'Joe434', 'fred@gmail.com',	'1979-04-19'),
('Bob', 'JOeblow', 'bob@gmail.com',	'1999-09-12');


INSERT INTO FLIGHTS (FLIGHTID, SOURCE, DESTINATION, DEPARTURE, LANDING)
VALUES
('Braden', 'Tink19', 'braden@gmail.com',	'1969-10-17'),
('Fred', 'Joe434', 'fred@gmail.com',	'1979-04-19'),
('Bob', 'JOeblow', 'bob@gmail.com',	'1999-09-12');

INSERT INTO registeredtickets(USERNAME, FLIGHTID, SEATNUMBER)
VALUES
('Braden', 1, 'A1'),
('Guest', 1, 'B1'),
('Guest', 1, 'A3'),
('Guest', 1, 'C1'),
('Guest', 1, 'D4');

INSERT INTO ASSIGNEDCREW(FLIGHTID, CREWID)
VALUES
( 1, 'A001'),
( 1, 'A002'),
( 1, 'A003'),
( 1, 'A004'),
( 1, 'A005');

INSERT INTO CREW(FNAME, LASTNAME, ID)
VALUES
('Larry', 'Bird', 'A001'),
('Greg', 'Bird', 'A002'),
('Jon', 'Smith', 'A003'),
('Nancy', 'Drew', 'A004'),
('Bob', 'Tim', 'A005'),





