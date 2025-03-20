--create database FilmoviRecenzije;

create table Kategorije (
sifra int primary key identity (1,1),
naziv varchar (100) not null
);

create table Filmovi (
sifra int primary key identity (1,1),
naziv varchar (50) not null,
godina_izlaska int,
trajanje int,
opis varchar (1000),
kategorija int references Kategorije (sifra),
slika varchar(max)
);

create table Glumci (
sifra int primary key identity (1,1),
glumac varchar (150) not null
);

create table FilmoviGlumci (
film_sifra int references Filmovi (sifra),
glumac_sifra int references Glumci (sifra)
);

create table Korisnici (
sifra int primary key identity (1,1),
ime varchar (50) not null,
email varchar (70) not null check (email like '%@%'),
lozinka varchar (30) not null,
administrator bit not null default 0,
);

create table Recenzije (
sifra int primary key identity (1,1),
film_sifra int references Filmovi (sifra),
korisnik_sifra int references Korisnici (sifra),
ocjena decimal (3,1) check (ocjena >= 1 and ocjena <=10),
recenzija text,
datum datetime
);

select * from Glumci;

insert into Glumci (glumac) values
('Leonardo DiCaprio'),
('Christian Bale'),
('Matthew McConaughey'),
('Kate Winslet'),
('Marlon Brando'),
('John Travolta'),
('Keanu Reeves'),
('Tom Hanks'),
('Russell Crowe'),
('Zoe Saldana'),
('Robert Downey Jr.'),
('Sam Neill'),
('Matthew Broderick'),
('Liam Neeson'),
('Heath Ledger'),
('Brad Pitt'),
('Tom Hardy'),
('Joaquin Phoenix'),
('Emma Stone'),
('Song Kang-ho'),
('Jared Leto'),
('Scarlett Johansson'),
('James McAvoy'),
('Sally Hawkins'),
('Leonardo DiCaprio'),
('Harrison Ford'),
('Al Pacino'),
('Angelina Jolie'),
('Morgan Freeman'),
('Will Smith');


select * from Filmovi where kategorija = 1


select * from Kategorije;

insert into Kategorije (naziv) values
('Akcija'), ('Komedija'), ('Drama'), ('Horor'), 
('Sci-Fi'),('Romantika'), ('Triler'), ('Avantura'), 
('Fantastika'), ('Misterij'), ('Dokumentarac'), ('Muzikal'), ('Kriminal'), ('Rat'), ('Vestern');



select * from Filmovi;

insert into Filmovi (naziv, godina_izlaska, kategorija, opis) values
('Inception', 2010, 5, 'A mind-bending thriller about dreams within dreams and the power of the subconscious.'),
('The Dark Knight', 2008, 1, 'A gritty crime drama featuring Batman’s battle against the Joker in Gotham City.'),
('Interstellar', 2014, 5, 'A space epic that explores the survival of humanity and the bending of time and space.'),
('Titanic', 1997, 6, 'A tragic love story set against the backdrop of the infamous sinking of the Titanic.'),
('The Godfather', 1972, 3, 'A powerful tale of family, crime, and betrayal in the world of the mafia.'),
('Pulp Fiction', 1994, 3, 'An unconventional narrative with intertwined stories of crime, redemption, and revenge.'),
('The Matrix', 1999, 5, 'A hacker discovers the truth about the simulated reality he is living in and fights for freedom.'),
('Forrest Gump', 1994, 3, 'The life of a simple man who inadvertently influences several key moments in American history.'),
('Gladiator', 2000, 7, 'A betrayed Roman general seeks revenge against the corrupt emperor who murdered his family.'),
('Avatar', 2009, 8, 'A visually stunning science fiction film set on the lush alien world of Pandora.'),
('The Avengers', 2012, 1, 'A team of superheroes unites to save Earth from an alien invasion.'),
('Jurassic Park', 1993, 8, 'Scientists clone dinosaurs and open a theme park, but chaos ensues when the creatures escape.'),
('The Lion King', 1994, 8, 'A young lion must reclaim his throne after the death of his father in the African savanna.'),
('Star Wars', 1977, 5, 'The battle between the Rebel Alliance and the oppressive Empire in a galaxy far, far away.'),
('Fight Club', 1999, 3, 'An insomniac office worker starts an underground fight club as a form of radical self-expression.'),
('The Silence of the Lambs', 1991, 10, 'A young FBI agent enlists the help of a manipulative serial killer to catch another killer.'),
('The Shawshank Redemption', 1994, 3, 'Two prisoners form an unlikely friendship while navigating life in a corrupt penitentiary.'),
('Schindlers List', 1993, 3, 'A powerful portrayal of Oskar Schindler’s efforts to save Jews during the Holocaust.'),
('Saving Private Ryan', 1998, 7, 'A group of soldiers embarks on a dangerous mission to find and bring home a paratrooper in WWII.'),
('The Departed', 2006, 3, 'A cop and a criminal infiltrate each other’s organizations, leading to a deadly game of cat and mouse.'),
('Mad Max: Fury Road', 2015, 1, 'A post-apocalyptic action film featuring high-speed chases and a quest for redemption.'),
('Joker', 2019, 3, 'The descent of a failed comedian into madness and his transformation into the infamous criminal mastermind.'),
('La La Land', 2016, 6, 'A musical romance about two dreamers in Los Angeles trying to make it big in their respective careers.'),
('Parasite', 2019, 3, 'A dark comedy-thriller about a poor family who infiltrates the lives of a wealthy family with devastating results.'),
('Django Unchained', 2012, 1, 'A freed slave partners with a bounty hunter to rescue his wife from a brutal plantation owner.'),
('The Green Mile', 1999, 3, 'A death row officer forms a bond with a man who has miraculous healing powers.'),
('The Prestige', 2006, 5, 'Two magicians engage in a bitter rivalry as they try to outdo each other with increasingly dangerous tricks.'),
('The Wolf of Wall Street', 2013, 3, 'A young stockbroker rises to wealth and power through corrupt and illegal means.'),
('Whiplash', 2014, 3, 'An ambitious drummer faces a ruthless music instructor who pushes him to his limits.'),
('A Beautiful Mind', 2001, 3, 'A brilliant mathematician battles mental illness while making groundbreaking contributions to his field.'),
('No Country for Old Men', 2007, 7, 'A hitman, a sheriff, and a hunter are caught in a violent game of cat and mouse in the Texas desert.'),
('Black Swan', 2010, 3, 'A talented ballet dancer’s descent into madness as she competes for the lead role in “Swan Lake.”'),
('The Grand Budapest Hotel', 2014, 2, 'The adventures of a hotel concierge and his protégé as they are embroiled in a heist.'),
('Shutter Island', 2010, 7, 'A U.S. marshal investigates a psychiatric facility where nothing is as it seems.'),
('The Revenant', 2015, 7, 'A frontiersman survives a bear attack and embarks on a quest for revenge against those who left him for dead.'),
('The Irishman', 2019, 3, 'An epic crime saga that explores the life of a hitman and his connections to organized crime.'),
('Blade Runner 2049', 2017, 5, 'A young blade runner unearths long-buried secrets that could change the fate of humanity.'),
('Dune', 2021, 5, 'A young nobleman embarks on a journey to protect the most valuable resource in the universe on a desert planet.'),
('Doctor Strange', 2016, 1, 'A brilliant surgeon learns the mystic arts to protect the world from otherworldly threats.'),
('It', 2017, 4, 'A group of children face their greatest fears when a malevolent entity takes the form of a clown.'),
('Halloween', 1978, 4, 'A masked killer escapes a mental institution and terrorizes a small town on Halloween night.'),
('A Quiet Place', 2018, 4, 'A family must live in silence to avoid deadly creatures that hunt by sound.'),
('The Conjuring', 2013, 4, 'Paranormal investigators help a family dealing with supernatural forces in their home.'),
('Hereditary', 2018, 4, 'A family unravels dark secrets after the death of their matriarch, leading to terrifying consequences.'),
('The Ring', 2002, 4, 'A journalist investigates a mysterious videotape that causes anyone who watches it to die within seven days.'),
('The Exorcist', 1973, 4, 'A young girl is possessed by a demon, and a priest must perform an exorcism to save her.'),
('Saw', 2004, 4, 'Two men are trapped in a room and must play a sadistic game of life and death to escape.'),
('The Thing', 1982, 4, 'A group of researchers in Antarctica faces a deadly alien organism capable of imitating anyone.'),
('Get Out', 2017, 4, 'A young black man visits his white girlfriend’s family and discovers a sinister secret.'),
('Us', 2019, 4, 'A family is confronted by their sinister doppelgangers, leading to a fight for survival.'),
('The Babadook', 2014, 4, 'A mother and her son are terrorized by a mysterious creature from a pop-up book.'),
('Midsommar', 2019, 4, 'A couple travels to Sweden for a festival that quickly turns into a disturbing and horrific experience.');


select * from FilmoviGlumci;

insert into FilmoviGlumci (film_sifra, glumac_sifra) values
(1, 1),  -- Inception - Leonardo DiCaprio
(2, 2),  -- The Dark Knight - Christian Bale
(3, 3),  -- Interstellar - Matthew McConaughey
(4, 4),  -- Titanic - Kate Winslet
(5, 5),  -- The Godfather - Marlon Brando
(6, 6),  -- Pulp Fiction - John Travolta
(7, 7),  -- The Matrix - Keanu Reeves
(8, 8),  -- Forrest Gump - Tom Hanks
(9, 9),  -- Gladiator - Russell Crowe
(10, 10), -- Avatar - Zoe Saldana
(11, 11), -- The Avengers - Robert Downey Jr.
(12, 12), -- Jurassic Park - Sam Neill
(13, 13), -- The Lion King - Matthew Broderick
(14, 14), -- Star Wars - Liam Neeson
(15, 15), -- Fight Club - Heath Ledger
(16, 16), -- The Silence of the Lambs - Brad Pitt
(17, 17), -- The Shawshank Redemption - Tom Hardy
(18, 18), -- Schindler's List - Joaquin Phoenix
(19, 19), -- Saving Private Ryan - Emma Stone
(20, 20), -- The Departed - Song Kang-ho
(21, 21), -- Mad Max: Fury Road - Jared Leto
(22, 22), -- Joker - Scarlett Johansson
(23, 23), -- La La Land - James McAvoy
(24, 24), -- Parasite - Sally Hawkins
(25, 25), -- Django Unchained - Leonardo DiCaprio
(26, 26), -- The Green Mile - Harrison Ford
(27, 27), -- The Prestige - Al Pacino
(28, 28), -- The Wolf of Wall Street - Angelina Jolie
(29, 29), -- Whiplash - Morgan Freeman
(30, 30); -- A Beautiful Mind - Will Smith



select * from Korisnici;

insert into Korisnici (ime, email, lozinka) values
('Ivan', 'ivan@example.com', 'password1'),
('Ana', 'ana@example.com', 'password2'),
('Marko', 'marko@example.com', 'password3'),
('Marija', 'marija@example.com', 'password4'),
('Petar', 'petar@example.com', 'password5'),
('Jelena', 'jelena@example.com', 'password6'),
('Luka', 'luka@example.com', 'password7'),
('Ivana', 'ivana@example.com', 'password8'),
('Tomislav', 'tomislav@example.com', 'password9'),
('Maja', 'maja@example.com', 'password10'),
('Nina', 'nina@example.com', 'password11'),
('Jure', 'jure@example.com', 'password12'),
('Karla', 'karla@example.com', 'password13'),
('Filip', 'filip@example.com', 'password14'),
('Sanja', 'sanja@example.com', 'password15'),
('Dario', 'dario@example.com', 'password16'),
('Lana', 'lana@example.com', 'password17'),
('Mario', 'mario@example.com', 'password18'),
('Matea', 'matea@example.com', 'password19'),
('Kristijan', 'kristijan@example.com', 'password20'),
('Lucija', 'lucija@example.com', 'password21'),
('David', 'david@example.com', 'password22'),
('Viktor', 'viktor@example.com', 'password23'),
('Katarina', 'katarina@example.com', 'password24'),
('Nikola', 'nikola@example.com', 'password25'),
('Silvija', 'silvija@example.com', 'password26'),
('Bojan', 'bojan@example.com', 'password27'),
('Petra', 'petra@example.com', 'password28'),
('Zoran', 'zoran@example.com', 'password29'),
('Lidija', 'lidija@example.com', 'password30'),
('Slavko', 'slavko@example.com', 'password31'),
('Mirna', 'mirna@example.com', 'password32'),
('Valentina', 'valentina@example.com', 'password33'),
('Igor', 'igor@example.com', 'password34'),
('Tanja', 'tanja@example.com', 'password35'),
('Boris', 'boris@example.com', 'password36'),
('Iva', 'iva@example.com', 'password37'),
('Dajana', 'dajana@example.com', 'password38'),
('Stjepan', 'stjepan@example.com', 'password39'),
('Martina', 'martina@example.com', 'password40'),
('Vanja', 'vanja@example.com', 'password41'),
('Jadranka', 'jadranka@example.com', 'password42'),
('Dora', 'dora@example.com', 'password43'),
('Tomislav', 'tomislav2@example.com', 'password44');

insert into Korisnici (ime, email, lozinka, administrator) values
('Klara', 'klara@example.com', 'klaraAdmin1', 1);


select * from Recenzije;

insert into Recenzije (film_sifra, korisnik_sifra, ocjena, recenzija, datum) values
(1, 5, 8.5, 'Sjajan zaplet i fantastična vizualna iskustva, ali bilo je teško ući u radnju.', '2025-03-20 12:30:00'),
(1, 7, 9.5, 'Nevjerojatan film s nevjerojatnom pričom. Koncept snova unutar snova je briljantan.', '2025-03-20 13:00:00'),
(1, 10, 7.0, 'Vizualno zapanjujuće, ali imala sam poteškoća s razumijevanjem radnje.', '2025-03-20 14:15:00'),
(2, 6, 10.0, 'Najbolji Batman film ikada. Heath Ledgerov nastup kao Joker je nezaboravan.', '2025-03-20 12:45:00'),
(2, 8, 9.0, 'Savršen spoj akcije i psihološkog trilera. Mračan i intenzivan.', '2025-03-20 13:30:00'),
(2, 12, 8.0, 'Fantastičan film, ali u nekim dijelovima je trajao predugo.', '2025-03-20 16:00:00'),
(3, 3, 8.0, 'Nevjerojatne vizualne scene, ali radnja je bila pomalo zbunjujuća u nekim trenucima.', '2025-03-20 17:30:00'),
(3, 9, 9.0, 'Briljantan pogled na vrijeme i svemir. Stvarno privlačno.', '2025-03-20 18:00:00'),
(3, 13, 7.5, 'Sjajan koncept, ali film mi je bio pomalo spor i ponavljajući.', '2025-03-20 19:00:00'),
(4, 2, 8.0, 'Klasična ljubavna priča, ali sam osjetila da je ritam bio pomalo spor sredinom filma.', '2025-03-20 20:30:00'),
(4, 11, 9.0, 'Vječna ljubavna priča s nevjerojatnim izvedbama. Tragedija djeluje stvarno.', '2025-03-20 21:00:00'),
(4, 15, 6.5, 'Lijep film, ali se nisam potpuno posvetila romansi.', '2025-03-20 22:00:00'),
(5, 3, 9.0, 'Jedan od najboljih filmova svih vremena. Neverovatna gluma, fantastična režija.', '2025-03-20 12:30:00'),
(6, 4, 8.5, 'Tarantino je ponovo briljirao. Zvuk, dijalozi, akcija - sve je na vrhunskom nivou.', '2025-03-20 13:15:00'),
(7, 8, 8.0, 'Briljantna ideja i vizualni efekti, ali film mi je bio pomalo spor na početku.', '2025-03-20 14:45:00'),
(8, 6, 9.0, 'Divna ljubavna priča sa nevjerojatnim likovima, film koji ostavlja snažan utisak.', '2025-03-20 16:00:00'),
(9, 7, 7.5, 'Film je solidan, ali nisam oduševljen. Povremeno je predug i predvidljiv.', '2025-03-20 17:30:00'),
(10, 9, 8.0, 'Zabavan film sa odličnim akcijskim scenama, ali pomalo predvidljiv.', '2025-03-20 18:00:00'),
(11, 10, 9.5, 'Nevjerojatan film, veoma emotivan, iako je radnja pomalo kaotična.', '2025-03-20 18:45:00'),
(12, 11, 8.0, 'Klasik animacije, divna vizualna i emocionalna dubina. Deca će obožavati!', '2025-03-20 19:30:00'),
(13, 12, 9.0, 'Potresna priča o hrabrosti i preživljavanju. Ne možete ostati ravnodušni.', '2025-03-20 20:15:00'),
(14, 13, 8.5, 'Fantastična adaptacija. Ponekad previše dramatično, ali veoma emotivno.', '2025-03-20 21:00:00'),
(15, 14, 9.0, 'Film je prepun uzbudljivih trenutaka i dubokih emocija. Izuzetno inspirativno.', '2025-03-20 21:45:00'),
(16, 15, 7.0, 'Zabavan, ali pomalo haotičan. Nije baš najbolji film za svakog.', '2025-03-20 22:30:00'),
(17, 16, 8.5, 'Ovaj film je pravo remek-delo, ne možeš da prestaneš da razmišljaš o njemu.', '2025-03-20 23:00:00'),
(18, 17, 9.0, 'Ovaj film je bio neizbežan, ali i daleko od očekivanja. Gluma i priča su savršeni.', '2025-03-20 23:45:00'),
(19, 18, 8.5, 'Jedan od najboljih ratnih filmova svih vremena, iako nije savršen.', '2025-03-20 23:59:00'),
(20, 19, 9.5, 'Jedan od najboljih filmova godine, zasluženo je dobio svih 5 zvezdica!', '2025-03-21 00:30:00'),
(21, 20, 8.0, 'Film sa prelepim scenama, ali nekako mi je pomalo predug.', '2025-03-21 01:00:00'),
(22, 21, 9.0, 'Zabavna i napeta priča o osveti. Držala me na ivici sedista.', '2025-03-21 02:00:00'),
(23, 22, 7.5, 'Film je solidan, ali u nekim trenucima se gubi u suvišnim detaljima.', '2025-03-21 03:00:00'),
(24, 23, 8.5, 'Nezaboravno iskustvo, sjajna akcija, ali mogao je biti malo kraći.', '2025-03-21 04:00:00');