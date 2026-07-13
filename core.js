/* ============================================================
   TRES EN RAYA FUTBOLÍSTICO — Núcleo del juego (lógica pura)
   Funciona en navegador (window.FGC) y en Node (module.exports)
   ============================================================ */
(function (root) {
  'use strict';

  /* ---------- Base de datos de jugadores ----------
     n   = nombre completo
     nat = nacionalidad (selección)
     cl  = clubes en los que jugó (partidos oficiales)
     wc  = ganó la Copa del Mundo
     ucl = ganó la Champions League / Copa de Europa
     bdo = ganó el Balón de Oro (France Football)
     pos = POR (portero) / DEF / MED / DEL
     Datos de hechos ampliamente reconocidos.
  */
  var P = [
    // --- Argentina ---
    { n: 'Lionel Messi', nat: 'Argentina', cl: ['Barcelona', 'PSG', 'Inter Miami'], wc: 1, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Diego Maradona', nat: 'Argentina', cl: ['Barcelona', 'Napoli', 'Boca Juniors'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Ángel Di María', nat: 'Argentina', cl: ['Benfica', 'Real Madrid', 'Manchester United', 'PSG', 'Juventus'], wc: 1, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Sergio Agüero', nat: 'Argentina', cl: ['Atlético Madrid', 'Manchester City', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Emiliano Martínez', nat: 'Argentina', cl: ['Arsenal', 'Aston Villa'], wc: 1, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Julián Álvarez', nat: 'Argentina', cl: ['River Plate', 'Manchester City', 'Atlético Madrid'], wc: 1, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Lautaro Martínez', nat: 'Argentina', cl: ['Inter'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Enzo Fernández', nat: 'Argentina', cl: ['River Plate', 'Benfica', 'Chelsea'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Alexis Mac Allister', nat: 'Argentina', cl: ['Brighton', 'Liverpool'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Rodrigo De Paul', nat: 'Argentina', cl: ['Udinese', 'Atlético Madrid'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Carlos Tevez', nat: 'Argentina', cl: ['Boca Juniors', 'Manchester United', 'Manchester City', 'Juventus'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Javier Mascherano', nat: 'Argentina', cl: ['Liverpool', 'Barcelona'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Gabriel Batistuta', nat: 'Argentina', cl: ['Fiorentina', 'Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Juan Román Riquelme', nat: 'Argentina', cl: ['Boca Juniors', 'Barcelona', 'Villarreal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Hernán Crespo', nat: 'Argentina', cl: ['Parma', 'Lazio', 'Inter', 'Chelsea', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },

    // --- Brasil ---
    { n: 'Pelé', nat: 'Brasil', cl: ['Santos'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Ronaldinho', nat: 'Brasil', cl: ['PSG', 'Barcelona', 'AC Milan'], wc: 1, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Ronaldo Nazário', nat: 'Brasil', cl: ['PSV', 'Barcelona', 'Inter', 'Real Madrid', 'AC Milan', 'Corinthians'], wc: 1, ucl: 0, bdo: 1, pos: 'DEL' },
    { n: 'Kaká', nat: 'Brasil', cl: ['São Paulo', 'AC Milan', 'Real Madrid'], wc: 1, ucl: 1, bdo: 1, pos: 'MED' },
    { n: 'Rivaldo', nat: 'Brasil', cl: ['Barcelona', 'AC Milan'], wc: 1, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Neymar', nat: 'Brasil', cl: ['Santos', 'Barcelona', 'PSG', 'Al-Hilal'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Cafú', nat: 'Brasil', cl: ['Roma', 'AC Milan'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Roberto Carlos', nat: 'Brasil', cl: ['Inter', 'Real Madrid'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Dida', nat: 'Brasil', cl: ['AC Milan'], wc: 1, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Thiago Silva', nat: 'Brasil', cl: ['AC Milan', 'PSG', 'Chelsea'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Marcelo', nat: 'Brasil', cl: ['Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Casemiro', nat: 'Brasil', cl: ['Real Madrid', 'Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Alisson', nat: 'Brasil', cl: ['Roma', 'Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Ederson', nat: 'Brasil', cl: ['Benfica', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Dani Alves', nat: 'Brasil', cl: ['Sevilla', 'Barcelona', 'Juventus', 'PSG', 'São Paulo'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Vinícius Júnior', nat: 'Brasil', cl: ['Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },

    // --- Francia ---
    { n: 'Zinedine Zidane', nat: 'Francia', cl: ['Juventus', 'Real Madrid'], wc: 1, ucl: 1, bdo: 1, pos: 'MED' },
    { n: 'Thierry Henry', nat: 'Francia', cl: ['Monaco', 'Arsenal', 'Barcelona'], wc: 1, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Kylian Mbappé', nat: 'Francia', cl: ['Monaco', 'PSG', 'Real Madrid'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Antoine Griezmann', nat: 'Francia', cl: ['Real Sociedad', 'Atlético Madrid', 'Barcelona'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Paul Pogba', nat: 'Francia', cl: ['Juventus', 'Manchester United'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: "N'Golo Kanté", nat: 'Francia', cl: ['Leicester', 'Chelsea'], wc: 1, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Karim Benzema', nat: 'Francia', cl: ['Lyon', 'Real Madrid', 'Al-Ittihad'], wc: 0, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Hugo Lloris', nat: 'Francia', cl: ['Lyon', 'Tottenham'], wc: 1, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Raphaël Varane', nat: 'Francia', cl: ['Real Madrid', 'Manchester United'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Didier Deschamps', nat: 'Francia', cl: ['Marseille', 'Juventus', 'Chelsea'], wc: 1, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Marcel Desailly', nat: 'Francia', cl: ['Marseille', 'AC Milan', 'Chelsea'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Franck Ribéry', nat: 'Francia', cl: ['Bayern Munich'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Patrick Vieira', nat: 'Francia', cl: ['Arsenal', 'Juventus', 'Inter', 'Manchester City'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },

    // --- España ---
    { n: 'Andrés Iniesta', nat: 'España', cl: ['Barcelona'], wc: 1, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Xavi Hernández', nat: 'España', cl: ['Barcelona'], wc: 1, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Sergio Ramos', nat: 'España', cl: ['Sevilla', 'Real Madrid', 'PSG'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Gerard Piqué', nat: 'España', cl: ['Manchester United', 'Barcelona'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Iker Casillas', nat: 'España', cl: ['Real Madrid', 'Porto'], wc: 1, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Carles Puyol', nat: 'España', cl: ['Barcelona'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Sergio Busquets', nat: 'España', cl: ['Barcelona', 'Inter Miami'], wc: 1, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'David Villa', nat: 'España', cl: ['Valencia', 'Barcelona', 'Atlético Madrid'], wc: 1, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Fernando Torres', nat: 'España', cl: ['Atlético Madrid', 'Liverpool', 'Chelsea'], wc: 1, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'David Silva', nat: 'España', cl: ['Valencia', 'Manchester City'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Xabi Alonso', nat: 'España', cl: ['Real Sociedad', 'Liverpool', 'Real Madrid', 'Bayern Munich'], wc: 1, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Cesc Fàbregas', nat: 'España', cl: ['Arsenal', 'Barcelona', 'Chelsea'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Rodri', nat: 'España', cl: ['Atlético Madrid', 'Manchester City'], wc: 0, ucl: 1, bdo: 1, pos: 'MED' },

    // --- Portugal ---
    { n: 'Cristiano Ronaldo', nat: 'Portugal', cl: ['Sporting', 'Manchester United', 'Real Madrid', 'Juventus', 'Al-Nassr'], wc: 0, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Luís Figo', nat: 'Portugal', cl: ['Sporting', 'Barcelona', 'Real Madrid', 'Inter'], wc: 0, ucl: 0, bdo: 1, pos: 'MED' },
    { n: 'Deco', nat: 'Portugal', cl: ['Porto', 'Barcelona', 'Chelsea'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Rui Costa', nat: 'Portugal', cl: ['Fiorentina', 'AC Milan'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Pepe', nat: 'Portugal', cl: ['Porto', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Bernardo Silva', nat: 'Portugal', cl: ['Monaco', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Rúben Dias', nat: 'Portugal', cl: ['Benfica', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Bruno Fernandes', nat: 'Portugal', cl: ['Sporting', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'João Félix', nat: 'Portugal', cl: ['Benfica', 'Atlético Madrid', 'Chelsea', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },

    // --- Alemania ---
    { n: 'Toni Kroos', nat: 'Alemania', cl: ['Bayern Munich', 'Real Madrid'], wc: 1, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Manuel Neuer', nat: 'Alemania', cl: ['Schalke 04', 'Bayern Munich'], wc: 1, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Thomas Müller', nat: 'Alemania', cl: ['Bayern Munich'], wc: 1, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Philipp Lahm', nat: 'Alemania', cl: ['Bayern Munich'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Bastian Schweinsteiger', nat: 'Alemania', cl: ['Bayern Munich', 'Manchester United'], wc: 1, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Miroslav Klose', nat: 'Alemania', cl: ['Werder Bremen', 'Bayern Munich', 'Lazio'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Mesut Özil', nat: 'Alemania', cl: ['Werder Bremen', 'Real Madrid', 'Arsenal'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Oliver Kahn', nat: 'Alemania', cl: ['Bayern Munich'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Michael Ballack', nat: 'Alemania', cl: ['Bayern Munich', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },

    // --- Italia ---
    { n: 'Gianluigi Buffon', nat: 'Italia', cl: ['Parma', 'Juventus', 'PSG'], wc: 1, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Andrea Pirlo', nat: 'Italia', cl: ['AC Milan', 'Juventus'], wc: 1, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Paolo Maldini', nat: 'Italia', cl: ['AC Milan'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Francesco Totti', nat: 'Italia', cl: ['Roma'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Alessandro Del Piero', nat: 'Italia', cl: ['Juventus'], wc: 1, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Fabio Cannavaro', nat: 'Italia', cl: ['Parma', 'Inter', 'Juventus', 'Real Madrid'], wc: 1, ucl: 0, bdo: 1, pos: 'DEF' },
    { n: 'Alessandro Nesta', nat: 'Italia', cl: ['Lazio', 'AC Milan'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Gennaro Gattuso', nat: 'Italia', cl: ['AC Milan'], wc: 1, ucl: 1, bdo: 0, pos: 'MED' },

    // --- Países Bajos ---
    { n: 'Marco van Basten', nat: 'Países Bajos', cl: ['Ajax', 'AC Milan'], wc: 0, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Ruud Gullit', nat: 'Países Bajos', cl: ['AC Milan', 'Chelsea'], wc: 0, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Dennis Bergkamp', nat: 'Países Bajos', cl: ['Ajax', 'Inter', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Arjen Robben', nat: 'Países Bajos', cl: ['PSV', 'Chelsea', 'Real Madrid', 'Bayern Munich'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Wesley Sneijder', nat: 'Países Bajos', cl: ['Ajax', 'Real Madrid', 'Inter'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Clarence Seedorf', nat: 'Países Bajos', cl: ['Ajax', 'Real Madrid', 'Inter', 'AC Milan'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Ruud van Nistelrooy', nat: 'Países Bajos', cl: ['PSV', 'Manchester United', 'Real Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Virgil van Dijk', nat: 'Países Bajos', cl: ['Southampton', 'Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },

    // --- Inglaterra ---
    { n: 'Wayne Rooney', nat: 'Inglaterra', cl: ['Everton', 'Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'David Beckham', nat: 'Inglaterra', cl: ['Manchester United', 'Real Madrid', 'AC Milan', 'PSG', 'LA Galaxy'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Frank Lampard', nat: 'Inglaterra', cl: ['Chelsea', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Steven Gerrard', nat: 'Inglaterra', cl: ['Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'John Terry', nat: 'Inglaterra', cl: ['Chelsea'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Rio Ferdinand', nat: 'Inglaterra', cl: ['Leeds', 'Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Paul Scholes', nat: 'Inglaterra', cl: ['Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Michael Owen', nat: 'Inglaterra', cl: ['Liverpool', 'Real Madrid', 'Manchester United'], wc: 0, ucl: 0, bdo: 1, pos: 'DEL' },
    { n: 'Harry Kane', nat: 'Inglaterra', cl: ['Tottenham', 'Bayern Munich'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },

    // --- Uruguay ---
    { n: 'Luis Suárez', nat: 'Uruguay', cl: ['Ajax', 'Liverpool', 'Barcelona', 'Atlético Madrid', 'Inter Miami'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Edinson Cavani', nat: 'Uruguay', cl: ['Napoli', 'PSG', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Diego Forlán', nat: 'Uruguay', cl: ['Manchester United', 'Villarreal', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },

    // --- Otros ---
    { n: 'Robert Lewandowski', nat: 'Polonia', cl: ['Borussia Dortmund', 'Bayern Munich', 'Barcelona'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Erling Haaland', nat: 'Noruega', cl: ['Salzburgo', 'Borussia Dortmund', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Zlatan Ibrahimović', nat: 'Suecia', cl: ['Ajax', 'Juventus', 'Inter', 'Barcelona', 'AC Milan', 'PSG', 'Manchester United', 'LA Galaxy'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Kevin De Bruyne', nat: 'Bélgica', cl: ['Chelsea', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Thibaut Courtois', nat: 'Bélgica', cl: ['Atlético Madrid', 'Chelsea', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Eden Hazard', nat: 'Bélgica', cl: ['Lille', 'Chelsea', 'Real Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Luka Modrić', nat: 'Croacia', cl: ['Tottenham', 'Real Madrid'], wc: 0, ucl: 1, bdo: 1, pos: 'MED' },
    { n: 'Ivan Rakitić', nat: 'Croacia', cl: ['Sevilla', 'Barcelona'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Mario Mandžukić', nat: 'Croacia', cl: ['Bayern Munich', 'Atlético Madrid', 'Juventus'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Mohamed Salah', nat: 'Egipto', cl: ['Chelsea', 'Roma', 'Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Sadio Mané', nat: 'Senegal', cl: ['Salzburgo', 'Southampton', 'Liverpool', 'Bayern Munich', 'Al-Nassr'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: "Samuel Eto'o", nat: 'Camerún', cl: ['Real Madrid', 'Mallorca', 'Barcelona', 'Inter', 'Chelsea'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Didier Drogba', nat: 'Costa de Marfil', cl: ['Marseille', 'Chelsea'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Yaya Touré', nat: 'Costa de Marfil', cl: ['Barcelona', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'George Weah', nat: 'Liberia', cl: ['Monaco', 'PSG', 'AC Milan', 'Chelsea'], wc: 0, ucl: 0, bdo: 1, pos: 'DEL' },
    { n: 'Gareth Bale', nat: 'Gales', cl: ['Tottenham', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Ryan Giggs', nat: 'Gales', cl: ['Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'George Best', nat: 'Irlanda del Norte', cl: ['Manchester United'], wc: 0, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Peter Schmeichel', nat: 'Dinamarca', cl: ['Manchester United', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },

    // --- Ampliación: más leyendas y variedad de ligas ---
    { n: 'Andriy Shevchenko', nat: 'Ucrania', cl: ['Dinamo Kyiv', 'AC Milan', 'Chelsea'], wc: 0, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Pavel Nedvěd', nat: 'República Checa', cl: ['Lazio', 'Juventus'], wc: 0, ucl: 0, bdo: 1, pos: 'MED' },
    { n: 'Hristo Stoichkov', nat: 'Bulgaria', cl: ['Barcelona'], wc: 0, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Roberto Baggio', nat: 'Italia', cl: ['Fiorentina', 'Juventus', 'AC Milan', 'Inter'], wc: 0, ucl: 0, bdo: 1, pos: 'DEL' },
    { n: 'Raúl González', nat: 'España', cl: ['Real Madrid', 'Schalke 04'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Petr Čech', nat: 'República Checa', cl: ['Chelsea', 'Arsenal'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Ashley Cole', nat: 'Inglaterra', cl: ['Arsenal', 'Chelsea'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Vincent Kompany', nat: 'Bélgica', cl: ['Anderlecht', 'Hamburgo', 'Manchester City'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Riyad Mahrez', nat: 'Argelia', cl: ['Leicester', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'İlkay Gündoğan', nat: 'Alemania', cl: ['Borussia Dortmund', 'Manchester City', 'Barcelona'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Phil Foden', nat: 'Inglaterra', cl: ['Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Bukayo Saka', nat: 'Inglaterra', cl: ['Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Jude Bellingham', nat: 'Inglaterra', cl: ['Borussia Dortmund', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Declan Rice', nat: 'Inglaterra', cl: ['West Ham', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Son Heung-min', nat: 'Corea del Sur', cl: ['Hamburgo', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Gonzalo Higuaín', nat: 'Argentina', cl: ['Real Madrid', 'Napoli', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Paulo Dybala', nat: 'Argentina', cl: ['Palermo', 'Juventus', 'Roma'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Isco', nat: 'España', cl: ['Málaga', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Koke', nat: 'España', cl: ['Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Alan Shearer', nat: 'Inglaterra', cl: ['Blackburn', 'Newcastle'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Gianfranco Zola', nat: 'Italia', cl: ['Napoli', 'Parma', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Radamel Falcao', nat: 'Colombia', cl: ['Porto', 'Atlético Madrid', 'Monaco', 'Manchester United', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'James Rodríguez', nat: 'Colombia', cl: ['Porto', 'Monaco', 'Real Madrid', 'Bayern Munich', 'Everton'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Arturo Vidal', nat: 'Chile', cl: ['Bayer Leverkusen', 'Juventus', 'Bayern Munich', 'Barcelona', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Alexis Sánchez', nat: 'Chile', cl: ['Udinese', 'Barcelona', 'Arsenal', 'Manchester United', 'Inter', 'Marseille'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Keylor Navas', nat: 'Costa Rica', cl: ['Levante', 'Real Madrid', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Johan Cruyff', nat: 'Países Bajos', cl: ['Ajax', 'Barcelona', 'Feyenoord'], wc: 0, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Edwin van der Sar', nat: 'Países Bajos', cl: ['Ajax', 'Juventus', 'Fulham', 'Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Rud Krol', nat: 'Países Bajos', cl: ['Ajax', 'Napoli'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },

    // ===== Segunda ampliación: muchas más leyendas y estrellas =====
    // Argentina
    { n: 'Fernando Redondo', nat: 'Argentina', cl: ['Tenerife', 'Real Madrid', 'AC Milan'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Esteban Cambiasso', nat: 'Argentina', cl: ['Real Madrid', 'Inter', 'Leicester'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Walter Samuel', nat: 'Argentina', cl: ['Roma', 'Real Madrid', 'Inter'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Nicolás Otamendi', nat: 'Argentina', cl: ['Valencia', 'Manchester City', 'Benfica'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Mauro Icardi', nat: 'Argentina', cl: ['Inter', 'PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // Brasil
    { n: 'Romário', nat: 'Brasil', cl: ['PSV', 'Barcelona'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Lúcio', nat: 'Brasil', cl: ['Bayer Leverkusen', 'Bayern Munich', 'Inter'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Maicon', nat: 'Brasil', cl: ['Monaco', 'Inter', 'Roma', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Júlio César', nat: 'Brasil', cl: ['Inter'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Gilberto Silva', nat: 'Brasil', cl: ['Arsenal'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'David Luiz', nat: 'Brasil', cl: ['Chelsea', 'PSG', 'Arsenal'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Fabinho', nat: 'Brasil', cl: ['Monaco', 'Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Roberto Firmino', nat: 'Brasil', cl: ['Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Philippe Coutinho', nat: 'Brasil', cl: ['Liverpool', 'Barcelona', 'Bayern Munich', 'Aston Villa'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Rodrygo', nat: 'Brasil', cl: ['Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Éder Militão', nat: 'Brasil', cl: ['Porto', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Robinho', nat: 'Brasil', cl: ['Santos', 'Real Madrid', 'Manchester City', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // Francia
    { n: 'Michel Platini', nat: 'Francia', cl: ['Juventus'], wc: 0, ucl: 1, bdo: 1, pos: 'MED' },
    { n: 'Jean-Pierre Papin', nat: 'Francia', cl: ['Marseille', 'AC Milan'], wc: 0, ucl: 0, bdo: 1, pos: 'DEL' },
    { n: 'Laurent Blanc', nat: 'Francia', cl: ['Barcelona', 'Marseille', 'Manchester United', 'Inter'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Robert Pirès', nat: 'Francia', cl: ['Marseille', 'Arsenal'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'David Trezeguet', nat: 'Francia', cl: ['Monaco', 'Juventus'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Claude Makélélé', nat: 'Francia', cl: ['Real Madrid', 'Chelsea', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Olivier Giroud', nat: 'Francia', cl: ['Arsenal', 'Chelsea', 'AC Milan'], wc: 1, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Ousmane Dembélé', nat: 'Francia', cl: ['Borussia Dortmund', 'Barcelona', 'PSG'], wc: 1, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Aurélien Tchouaméni', nat: 'Francia', cl: ['Monaco', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    // España
    { n: 'Fernando Hierro', nat: 'España', cl: ['Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Álvaro Morata', nat: 'España', cl: ['Real Madrid', 'Juventus', 'Chelsea', 'Atlético Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Thiago Alcántara', nat: 'España', cl: ['Barcelona', 'Bayern Munich', 'Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'César Azpilicueta', nat: 'España', cl: ['Marseille', 'Chelsea', 'Atlético Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Jordi Alba', nat: 'España', cl: ['Valencia', 'Barcelona', 'Inter Miami'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'David de Gea', nat: 'España', cl: ['Atlético Madrid', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Juan Mata', nat: 'España', cl: ['Valencia', 'Chelsea', 'Manchester United'], wc: 1, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Pepe Reina', nat: 'España', cl: ['Barcelona', 'Liverpool', 'Napoli', 'Bayern Munich', 'AC Milan'], wc: 1, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Dani Carvajal', nat: 'España', cl: ['Bayer Leverkusen', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Marco Asensio', nat: 'España', cl: ['Real Madrid', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Pedro Rodríguez', nat: 'España', cl: ['Barcelona', 'Chelsea'], wc: 1, ucl: 1, bdo: 0, pos: 'DEL' },
    // Portugal
    { n: 'Ricardo Carvalho', nat: 'Portugal', cl: ['Porto', 'Chelsea', 'Real Madrid', 'Monaco'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Nani', nat: 'Portugal', cl: ['Sporting', 'Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'João Moutinho', nat: 'Portugal', cl: ['Sporting', 'Porto', 'Monaco'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Vítor Baía', nat: 'Portugal', cl: ['Porto', 'Barcelona'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    // Inglaterra
    { n: 'Bobby Charlton', nat: 'Inglaterra', cl: ['Manchester United'], wc: 1, ucl: 1, bdo: 1, pos: 'MED' },
    { n: 'Gary Neville', nat: 'Inglaterra', cl: ['Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Jamie Carragher', nat: 'Inglaterra', cl: ['Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Jordan Henderson', nat: 'Inglaterra', cl: ['Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Raheem Sterling', nat: 'Inglaterra', cl: ['Liverpool', 'Manchester City', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Marcus Rashford', nat: 'Inglaterra', cl: ['Manchester United', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Jack Grealish', nat: 'Inglaterra', cl: ['Aston Villa', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'John Stones', nat: 'Inglaterra', cl: ['Everton', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Kyle Walker', nat: 'Inglaterra', cl: ['Tottenham', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    // Italia
    { n: 'Franco Baresi', nat: 'Italia', cl: ['AC Milan'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Dino Zoff', nat: 'Italia', cl: ['Juventus'], wc: 1, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Filippo Inzaghi', nat: 'Italia', cl: ['Juventus', 'AC Milan'], wc: 1, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Daniele De Rossi', nat: 'Italia', cl: ['Roma'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Giorgio Chiellini', nat: 'Italia', cl: ['Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Leonardo Bonucci', nat: 'Italia', cl: ['Juventus', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Marco Verratti', nat: 'Italia', cl: ['PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Alemania
    { n: 'Franz Beckenbauer', nat: 'Alemania', cl: ['Bayern Munich'], wc: 1, ucl: 1, bdo: 1, pos: 'DEF' },
    { n: 'Gerd Müller', nat: 'Alemania', cl: ['Bayern Munich'], wc: 1, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Lothar Matthäus', nat: 'Alemania', cl: ['Bayern Munich', 'Inter'], wc: 1, ucl: 0, bdo: 1, pos: 'MED' },
    { n: 'Jürgen Klinsmann', nat: 'Alemania', cl: ['Bayern Munich', 'Inter', 'Tottenham', 'Monaco'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Sami Khedira', nat: 'Alemania', cl: ['Stuttgart', 'Real Madrid', 'Juventus'], wc: 1, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Jérôme Boateng', nat: 'Alemania', cl: ['Manchester City', 'Bayern Munich'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Mats Hummels', nat: 'Alemania', cl: ['Bayern Munich', 'Borussia Dortmund'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Mario Götze', nat: 'Alemania', cl: ['Borussia Dortmund', 'Bayern Munich'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Joshua Kimmich', nat: 'Alemania', cl: ['Bayern Munich'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Kai Havertz', nat: 'Alemania', cl: ['Bayer Leverkusen', 'Chelsea', 'Arsenal'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    // Países Bajos
    { n: 'Johan Neeskens', nat: 'Países Bajos', cl: ['Ajax', 'Barcelona'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Edgar Davids', nat: 'Países Bajos', cl: ['Ajax', 'Juventus', 'Barcelona', 'Inter', 'Tottenham'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Patrick Kluivert', nat: 'Países Bajos', cl: ['Ajax', 'AC Milan', 'Barcelona'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Marc Overmars', nat: 'Países Bajos', cl: ['Ajax', 'Arsenal', 'Barcelona'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Memphis Depay', nat: 'Países Bajos', cl: ['PSV', 'Manchester United', 'Lyon', 'Barcelona', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Georginio Wijnaldum', nat: 'Países Bajos', cl: ['PSV', 'Liverpool', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Frenkie de Jong', nat: 'Países Bajos', cl: ['Ajax', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Matthijs de Ligt', nat: 'Países Bajos', cl: ['Ajax', 'Juventus', 'Bayern Munich', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // Uruguay
    { n: 'Diego Godín', nat: 'Uruguay', cl: ['Villarreal', 'Atlético Madrid', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Federico Valverde', nat: 'Uruguay', cl: ['Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Darwin Núñez', nat: 'Uruguay', cl: ['Benfica', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // Colombia
    { n: 'Juan Cuadrado', nat: 'Colombia', cl: ['Fiorentina', 'Chelsea', 'Juventus', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Luis Díaz', nat: 'Colombia', cl: ['Porto', 'Liverpool', 'Bayern Munich'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // México
    { n: 'Rafael Márquez', nat: 'México', cl: ['Monaco', 'Barcelona'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Hugo Sánchez', nat: 'México', cl: ['Atlético Madrid', 'Real Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Javier Hernández', nat: 'México', cl: ['Manchester United', 'Real Madrid', 'Bayer Leverkusen', 'LA Galaxy'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // Marruecos
    { n: 'Achraf Hakimi', nat: 'Marruecos', cl: ['Real Madrid', 'Borussia Dortmund', 'Inter', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Hakim Ziyech', nat: 'Marruecos', cl: ['Ajax', 'Chelsea'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    // Otros
    { n: 'Gheorghe Hagi', nat: 'Rumanía', cl: ['Real Madrid', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Davor Šuker', nat: 'Croacia', cl: ['Sevilla', 'Real Madrid', 'Arsenal'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Jan Oblak', nat: 'Eslovenia', cl: ['Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Kalidou Koulibaly', nat: 'Senegal', cl: ['Napoli', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Shinji Kagawa', nat: 'Japón', cl: ['Borussia Dortmund', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },

    // ===== Tercera ampliación (rumbo a 500) =====
    // Argentina
    { n: 'Javier Zanetti', nat: 'Argentina', cl: ['Inter'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Juan Sebastián Verón', nat: 'Argentina', cl: ['Lazio', 'Manchester United', 'Chelsea', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Gabriel Heinze', nat: 'Argentina', cl: ['PSG', 'Manchester United', 'Real Madrid', 'Marseille', 'Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Maxi Rodríguez', nat: 'Argentina', cl: ['Espanyol', 'Atlético Madrid', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Ever Banega', nat: 'Argentina', cl: ['Valencia', 'Sevilla', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Fernando Gago', nat: 'Argentina', cl: ['Boca Juniors', 'Real Madrid', 'Valencia', 'Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Marcos Rojo', nat: 'Argentina', cl: ['Sporting', 'Manchester United', 'Boca Juniors'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Leandro Paredes', nat: 'Argentina', cl: ['Roma', 'PSG', 'Juventus'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Ángel Correa', nat: 'Argentina', cl: ['Atlético Madrid'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Exequiel Palacios', nat: 'Argentina', cl: ['River Plate', 'Bayer Leverkusen'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Lisandro Martínez', nat: 'Argentina', cl: ['Ajax', 'Manchester United'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Rodrigo Bentancur', nat: 'Argentina', cl: ['Boca Juniors', 'Juventus', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Brasil
    { n: 'Adriano', nat: 'Brasil', cl: ['Inter', 'Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Zé Roberto', nat: 'Brasil', cl: ['Bayer Leverkusen', 'Bayern Munich'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Alexandre Pato', nat: 'Brasil', cl: ['AC Milan', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Hulk', nat: 'Brasil', cl: ['Porto'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Oscar', nat: 'Brasil', cl: ['Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Ramires', nat: 'Brasil', cl: ['Chelsea'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Willian', nat: 'Brasil', cl: ['Corinthians', 'Shakhtar', 'Chelsea', 'Arsenal', 'Fulham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Douglas Costa', nat: 'Brasil', cl: ['Shakhtar', 'Bayern Munich', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Fernandinho', nat: 'Brasil', cl: ['Athletico Paranaense', 'Shakhtar', 'Manchester City'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Gabriel Jesus', nat: 'Brasil', cl: ['Manchester City', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Antony', nat: 'Brasil', cl: ['Ajax', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Bruno Guimarães', nat: 'Brasil', cl: ['Lyon', 'Newcastle'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Gabriel Magalhães', nat: 'Brasil', cl: ['Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Richarlison', nat: 'Brasil', cl: ['Everton', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Endrick', nat: 'Brasil', cl: ['Palmeiras', 'Real Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // Francia
    { n: 'Christian Karembeu', nat: 'Francia', cl: ['Real Madrid', 'Middlesbrough'], wc: 1, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Bixente Lizarazu', nat: 'Francia', cl: ['Bayern Munich', 'Marseille'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Lilian Thuram', nat: 'Francia', cl: ['Parma', 'Juventus', 'Barcelona'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Patrick Evra', nat: 'Francia', cl: ['Monaco', 'Manchester United', 'Juventus'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Eric Abidal', nat: 'Francia', cl: ['Lyon', 'Barcelona'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Florent Malouda', nat: 'Francia', cl: ['Lyon', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Kingsley Coman', nat: 'Francia', cl: ['PSG', 'Juventus', 'Bayern Munich'], wc: 1, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Lucas Hernández', nat: 'Francia', cl: ['Atlético Madrid', 'Bayern Munich', 'PSG'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Benjamin Pavard', nat: 'Francia', cl: ['Stuttgart', 'Bayern Munich', 'Inter'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Corentin Tolisso', nat: 'Francia', cl: ['Lyon', 'Bayern Munich'], wc: 1, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Adrien Rabiot', nat: 'Francia', cl: ['PSG', 'Juventus', 'Marseille'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Anthony Martial', nat: 'Francia', cl: ['Monaco', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Eduardo Camavinga', nat: 'Francia', cl: ['Rennes', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Jules Koundé', nat: 'Francia', cl: ['Sevilla', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'William Saliba', nat: 'Francia', cl: ['Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Mike Maignan', nat: 'Francia', cl: ['Lille', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    // España
    { n: 'Luis Suárez Miramontes', nat: 'España', cl: ['Barcelona', 'Inter'], wc: 0, ucl: 1, bdo: 1, pos: 'MED' },
    { n: 'Emilio Butragueño', nat: 'España', cl: ['Real Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Fernando Morientes', nat: 'España', cl: ['Real Madrid', 'Monaco', 'Liverpool', 'Valencia'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Míchel Salgado', nat: 'España', cl: ['Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Álvaro Arbeloa', nat: 'España', cl: ['Liverpool', 'Real Madrid'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Santi Cazorla', nat: 'España', cl: ['Villarreal', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Saúl Ñíguez', nat: 'España', cl: ['Atlético Madrid', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Gavi', nat: 'España', cl: ['Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Pedri', nat: 'España', cl: ['Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Ferran Torres', nat: 'España', cl: ['Valencia', 'Manchester City', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Mikel Oyarzabal', nat: 'España', cl: ['Real Sociedad'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Dani Olmo', nat: 'España', cl: ['RB Leipzig', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Nico Williams', nat: 'España', cl: ['Athletic'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Lamine Yamal', nat: 'España', cl: ['Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Fabián Ruiz', nat: 'España', cl: ['Napoli', 'PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Portugal
    { n: 'Eusébio', nat: 'Portugal', cl: ['Benfica'], wc: 0, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Fernando Couto', nat: 'Portugal', cl: ['Barcelona', 'Lazio', 'Parma'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Simão Sabrosa', nat: 'Portugal', cl: ['Barcelona', 'Benfica', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Raúl Meireles', nat: 'Portugal', cl: ['Porto', 'Liverpool', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'William Carvalho', nat: 'Portugal', cl: ['Sporting', 'Betis'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Rúben Neves', nat: 'Portugal', cl: ['Porto', 'Wolves', 'Al-Hilal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Diogo Jota', nat: 'Portugal', cl: ['Wolves', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Rafael Leão', nat: 'Portugal', cl: ['Lille', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Gonçalo Ramos', nat: 'Portugal', cl: ['Benfica', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Vitinha', nat: 'Portugal', cl: ['Porto', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'João Cancelo', nat: 'Portugal', cl: ['Valencia', 'Juventus', 'Manchester City', 'Barcelona', 'Al-Hilal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Nélson Semedo', nat: 'Portugal', cl: ['Benfica', 'Barcelona', 'Wolves'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // Inglaterra
    { n: 'Kevin Keegan', nat: 'Inglaterra', cl: ['Liverpool', 'Hamburgo'], wc: 0, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Gary Lineker', nat: 'Inglaterra', cl: ['Everton', 'Barcelona', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Teddy Sheringham', nat: 'Inglaterra', cl: ['Tottenham', 'Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Andy Cole', nat: 'Inglaterra', cl: ['Newcastle', 'Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Michael Carrick', nat: 'Inglaterra', cl: ['Tottenham', 'Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Owen Hargreaves', nat: 'Inglaterra', cl: ['Bayern Munich', 'Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Ashley Young', nat: 'Inglaterra', cl: ['Aston Villa', 'Manchester United', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Kieran Trippier', nat: 'Inglaterra', cl: ['Tottenham', 'Atlético Madrid', 'Newcastle'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Harry Maguire', nat: 'Inglaterra', cl: ['Leicester', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Trent Alexander-Arnold', nat: 'Inglaterra', cl: ['Liverpool', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Mason Mount', nat: 'Inglaterra', cl: ['Chelsea', 'Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Reece James', nat: 'Inglaterra', cl: ['Chelsea'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Jordan Pickford', nat: 'Inglaterra', cl: ['Everton'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    // Italia
    { n: 'Paolo Rossi', nat: 'Italia', cl: ['Juventus'], wc: 1, ucl: 0, bdo: 1, pos: 'DEL' },
    { n: 'Giuseppe Bergomi', nat: 'Italia', cl: ['Inter'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Demetrio Albertini', nat: 'Italia', cl: ['AC Milan'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Alessandro Costacurta', nat: 'Italia', cl: ['AC Milan'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Christian Vieri', nat: 'Italia', cl: ['Juventus', 'Atlético Madrid', 'Lazio', 'Inter', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Luca Toni', nat: 'Italia', cl: ['Palermo', 'Bayern Munich', 'Fiorentina'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Fabio Grosso', nat: 'Italia', cl: ['Palermo', 'Inter', 'Lyon'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Marco Materazzi', nat: 'Italia', cl: ['Inter'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Antonio Cassano', nat: 'Italia', cl: ['Roma', 'Real Madrid', 'Sampdoria', 'AC Milan', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Federico Chiesa', nat: 'Italia', cl: ['Fiorentina', 'Juventus', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Nicolò Barella', nat: 'Italia', cl: ['Cagliari', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Gianluigi Donnarumma', nat: 'Italia', cl: ['AC Milan', 'PSG', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Lorenzo Insigne', nat: 'Italia', cl: ['Napoli'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Jorginho', nat: 'Italia', cl: ['Napoli', 'Chelsea', 'Arsenal'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    // Alemania
    { n: 'Sepp Maier', nat: 'Alemania', cl: ['Bayern Munich'], wc: 1, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Paul Breitner', nat: 'Alemania', cl: ['Bayern Munich', 'Real Madrid'], wc: 1, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Rudi Völler', nat: 'Alemania', cl: ['Werder Bremen', 'Roma', 'Marseille', 'Bayer Leverkusen'], wc: 1, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Andreas Brehme', nat: 'Alemania', cl: ['Bayern Munich', 'Inter'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Matthias Sammer', nat: 'Alemania', cl: ['Borussia Dortmund'], wc: 0, ucl: 1, bdo: 1, pos: 'DEF' },
    { n: 'Per Mertesacker', nat: 'Alemania', cl: ['Werder Bremen', 'Arsenal'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Julian Draxler', nat: 'Alemania', cl: ['Schalke 04', 'PSG'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Marco Reus', nat: 'Alemania', cl: ['Borussia Dortmund'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Serge Gnabry', nat: 'Alemania', cl: ['Arsenal', 'Bayern Munich'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Antonio Rüdiger', nat: 'Alemania', cl: ['Roma', 'Chelsea', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Leroy Sané', nat: 'Alemania', cl: ['Manchester City', 'Bayern Munich'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Jamal Musiala', nat: 'Alemania', cl: ['Bayern Munich'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Florian Wirtz', nat: 'Alemania', cl: ['Bayer Leverkusen', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Países Bajos
    { n: 'Ronald Koeman', nat: 'Países Bajos', cl: ['PSV', 'Barcelona'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Frank de Boer', nat: 'Países Bajos', cl: ['Ajax', 'Barcelona'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Jaap Stam', nat: 'Países Bajos', cl: ['PSV', 'Manchester United', 'Lazio', 'AC Milan'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Giovanni van Bronckhorst', nat: 'Países Bajos', cl: ['Arsenal', 'Barcelona'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Mark van Bommel', nat: 'Países Bajos', cl: ['PSV', 'Barcelona', 'Bayern Munich'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Rafael van der Vaart', nat: 'Países Bajos', cl: ['Ajax', 'Real Madrid', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Klaas-Jan Huntelaar', nat: 'Países Bajos', cl: ['Ajax', 'Real Madrid', 'AC Milan', 'Schalke 04'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Nigel de Jong', nat: 'Países Bajos', cl: ['Hamburgo', 'Manchester City', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Cody Gakpo', nat: 'Países Bajos', cl: ['PSV', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Denzel Dumfries', nat: 'Países Bajos', cl: ['PSV', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Nathan Aké', nat: 'Países Bajos', cl: ['Chelsea', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    // Uruguay
    { n: 'Enzo Francescoli', nat: 'Uruguay', cl: ['River Plate', 'Marseille'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Álvaro Recoba', nat: 'Uruguay', cl: ['Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Ronald Araújo', nat: 'Uruguay', cl: ['Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'José María Giménez', nat: 'Uruguay', cl: ['Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // Colombia
    { n: 'Carlos Valderrama', nat: 'Colombia', cl: ['Montpellier'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Davinson Sánchez', nat: 'Colombia', cl: ['Ajax', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Yerry Mina', nat: 'Colombia', cl: ['Barcelona', 'Everton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // Chile
    { n: 'Iván Zamorano', nat: 'Chile', cl: ['Real Madrid', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Marcelo Salas', nat: 'Chile', cl: ['River Plate', 'Lazio', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Claudio Bravo', nat: 'Chile', cl: ['Real Sociedad', 'Barcelona', 'Manchester City'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Gary Medel', nat: 'Chile', cl: ['Sevilla', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // México
    { n: 'Guillermo Ochoa', nat: 'México', cl: ['Málaga'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    // Croacia
    { n: 'Zvonimir Boban', nat: 'Croacia', cl: ['AC Milan'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Robert Prosinečki', nat: 'Croacia', cl: ['Real Madrid', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Mateo Kovačić', nat: 'Croacia', cl: ['Inter', 'Real Madrid', 'Chelsea', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Marcelo Brozović', nat: 'Croacia', cl: ['Inter', 'Al-Nassr'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Dejan Lovren', nat: 'Croacia', cl: ['Southampton', 'Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Joško Gvardiol', nat: 'Croacia', cl: ['RB Leipzig', 'Manchester City'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // Bélgica
    { n: 'Jan Vertonghen', nat: 'Bélgica', cl: ['Ajax', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Toby Alderweireld', nat: 'Bélgica', cl: ['Ajax', 'Atlético Madrid', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Axel Witsel', nat: 'Bélgica', cl: ['Benfica', 'Borussia Dortmund', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Dries Mertens', nat: 'Bélgica', cl: ['PSV', 'Napoli'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Romelu Lukaku', nat: 'Bélgica', cl: ['Anderlecht', 'Chelsea', 'Everton', 'Manchester United', 'Inter', 'Roma', 'Napoli'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Youri Tielemans', nat: 'Bélgica', cl: ['Anderlecht', 'Monaco', 'Leicester', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Suecia
    { n: 'Henrik Larsson', nat: 'Suecia', cl: ['Celtic', 'Barcelona', 'Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Freddie Ljungberg', nat: 'Suecia', cl: ['Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Dinamarca
    { n: 'Michael Laudrup', nat: 'Dinamarca', cl: ['Juventus', 'Barcelona', 'Real Madrid', 'Ajax'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Brian Laudrup', nat: 'Dinamarca', cl: ['AC Milan', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Christian Eriksen', nat: 'Dinamarca', cl: ['Ajax', 'Tottenham', 'Inter', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Kasper Schmeichel', nat: 'Dinamarca', cl: ['Leicester'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    // Polonia
    { n: 'Zbigniew Boniek', nat: 'Polonia', cl: ['Juventus', 'Roma'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Jerzy Dudek', nat: 'Polonia', cl: ['Liverpool', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Wojciech Szczęsny', nat: 'Polonia', cl: ['Arsenal', 'Roma', 'Juventus', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Piotr Zieliński', nat: 'Polonia', cl: ['Napoli', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Noruega
    { n: 'Ole Gunnar Solskjær', nat: 'Noruega', cl: ['Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'John Arne Riise', nat: 'Noruega', cl: ['Monaco', 'Liverpool', 'Roma'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Martin Ødegaard', nat: 'Noruega', cl: ['Real Madrid', 'Real Sociedad', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Egipto
    { n: 'Mohamed Elneny', nat: 'Egipto', cl: ['Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Ucrania
    { n: 'Anatoliy Tymoshchuk', nat: 'Ucrania', cl: ['Zenit', 'Bayern Munich'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Oleksandr Zinchenko', nat: 'Ucrania', cl: ['Manchester City', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Andriy Yarmolenko', nat: 'Ucrania', cl: ['Borussia Dortmund', 'West Ham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // Costa de Marfil
    { n: 'Kolo Touré', nat: 'Costa de Marfil', cl: ['Arsenal', 'Manchester City', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Gervinho', nat: 'Costa de Marfil', cl: ['Lille', 'Arsenal', 'Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Wilfried Zaha', nat: 'Costa de Marfil', cl: ['Manchester United', 'Galatasaray'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // Camerún
    { n: 'Alex Song', nat: 'Camerún', cl: ['Arsenal', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'André Onana', nat: 'Camerún', cl: ['Ajax', 'Inter', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    // Ghana
    { n: 'Sulley Muntari', nat: 'Ghana', cl: ['Portsmouth', 'Inter', 'AC Milan'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Thomas Partey', nat: 'Ghana', cl: ['Atlético Madrid', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Nigeria
    { n: 'Nwankwo Kanu', nat: 'Nigeria', cl: ['Ajax', 'Inter', 'Arsenal'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Jay-Jay Okocha', nat: 'Nigeria', cl: ['PSG', 'Bolton'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'John Obi Mikel', nat: 'Nigeria', cl: ['Chelsea'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Victor Osimhen', nat: 'Nigeria', cl: ['Lille', 'Napoli', 'Galatasaray'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // Gales
    { n: 'Ian Rush', nat: 'Gales', cl: ['Liverpool', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Aaron Ramsey', nat: 'Gales', cl: ['Arsenal', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Serbia
    { n: 'Nemanja Vidić', nat: 'Serbia', cl: ['Manchester United', 'Inter'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Dejan Stanković', nat: 'Serbia', cl: ['Lazio', 'Inter'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Branislav Ivanović', nat: 'Serbia', cl: ['Chelsea'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Dušan Tadić', nat: 'Serbia', cl: ['Southampton', 'Ajax'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Dušan Vlahović', nat: 'Serbia', cl: ['Fiorentina', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Sergej Milinković-Savić', nat: 'Serbia', cl: ['Lazio', 'Al-Hilal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Austria
    { n: 'David Alaba', nat: 'Austria', cl: ['Bayern Munich', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Marko Arnautović', nat: 'Austria', cl: ['Werder Bremen', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Marcel Sabitzer', nat: 'Austria', cl: ['RB Leipzig', 'Bayern Munich', 'Borussia Dortmund'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Turquía
    { n: 'Arda Turan', nat: 'Turquía', cl: ['Atlético Madrid', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Hakan Çalhanoğlu', nat: 'Turquía', cl: ['Bayer Leverkusen', 'AC Milan', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Japón
    { n: 'Keisuke Honda', nat: 'Japón', cl: ['AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Hidetoshi Nakata', nat: 'Japón', cl: ['Roma', 'Parma'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Takefusa Kubo', nat: 'Japón', cl: ['Real Madrid', 'Real Sociedad'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // Corea del Sur
    { n: 'Park Ji-sung', nat: 'Corea del Sur', cl: ['PSV', 'Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Lee Kang-in', nat: 'Corea del Sur', cl: ['Valencia', 'PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Bulgaria
    { n: 'Dimitar Berbatov', nat: 'Bulgaria', cl: ['Bayer Leverkusen', 'Tottenham', 'Manchester United', 'Monaco'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // Rumanía
    { n: 'Gheorghe Popescu', nat: 'Rumanía', cl: ['Barcelona', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Adrian Mutu', nat: 'Rumanía', cl: ['Chelsea', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Cristian Chivu', nat: 'Rumanía', cl: ['Ajax', 'Roma', 'Inter'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    // Senegal
    { n: 'El Hadji Diouf', nat: 'Senegal', cl: ['Liverpool', 'Bolton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Idrissa Gueye', nat: 'Senegal', cl: ['Everton', 'PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Édouard Mendy', nat: 'Senegal', cl: ['Chelsea', 'Al-Ahli'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    // Marruecos
    { n: 'Youssef En-Nesyri', nat: 'Marruecos', cl: ['Sevilla'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Sofyan Amrabat', nat: 'Marruecos', cl: ['Fiorentina', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },

    // ===== Cuarta ampliación: leyendas históricas y más (500+) =====
    // Argentina
    { n: 'Mario Kempes', nat: 'Argentina', cl: ['Valencia', 'River Plate'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Daniel Passarella', nat: 'Argentina', cl: ['River Plate', 'Fiorentina', 'Inter'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Jorge Valdano', nat: 'Argentina', cl: ['Real Madrid', 'Zaragoza'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Pablo Aimar', nat: 'Argentina', cl: ['River Plate', 'Valencia', 'Benfica'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Ariel Ortega', nat: 'Argentina', cl: ['River Plate', 'Valencia', 'Sampdoria'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Roberto Ayala', nat: 'Argentina', cl: ['River Plate', 'Valencia', 'AC Milan', 'Zaragoza'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Diego Simeone', nat: 'Argentina', cl: ['Sevilla', 'Atlético Madrid', 'Inter', 'Lazio'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Brasil
    { n: 'Sócrates', nat: 'Brasil', cl: ['Corinthians', 'Fiorentina'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Zico', nat: 'Brasil', cl: ['Flamengo', 'Udinese'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Careca', nat: 'Brasil', cl: ['Napoli'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Bebeto', nat: 'Brasil', cl: ['Deportivo', 'Flamengo'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Dunga', nat: 'Brasil', cl: ['Fiorentina', 'Pisa'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Cláudio Taffarel', nat: 'Brasil', cl: ['Parma', 'Galatasaray'], wc: 1, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Aldair', nat: 'Brasil', cl: ['Roma'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Juninho Pernambucano', nat: 'Brasil', cl: ['Lyon'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Emerson', nat: 'Brasil', cl: ['Roma', 'Juventus', 'Real Madrid', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Francia
    { n: 'Raymond Kopa', nat: 'Francia', cl: ['Real Madrid', 'Reims'], wc: 0, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Jean Tigana', nat: 'Francia', cl: ['Bordeaux', 'Marseille'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Youri Djorkaeff', nat: 'Francia', cl: ['Monaco', 'PSG', 'Inter'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Emmanuel Petit', nat: 'Francia', cl: ['Monaco', 'Arsenal', 'Barcelona', 'Chelsea'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Christophe Dugarry', nat: 'Francia', cl: ['Bordeaux', 'AC Milan', 'Barcelona'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Sylvain Wiltord', nat: 'Francia', cl: ['Bordeaux', 'Arsenal', 'Lyon'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // España
    { n: 'Andoni Zubizarreta', nat: 'España', cl: ['Athletic', 'Barcelona', 'Valencia'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Guti', nat: 'España', cl: ['Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'José Antonio Reyes', nat: 'España', cl: ['Sevilla', 'Arsenal', 'Real Madrid', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Diego Costa', nat: 'España', cl: ['Atlético Madrid', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Joaquín', nat: 'España', cl: ['Betis', 'Valencia'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Portugal
    { n: 'Rui Patrício', nat: 'Portugal', cl: ['Sporting', 'Wolves', 'Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Costinha', nat: 'Portugal', cl: ['Porto', 'Monaco'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Maniche', nat: 'Portugal', cl: ['Porto', 'Chelsea', 'Atlético Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Fábio Coentrão', nat: 'Portugal', cl: ['Benfica', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Ricardo Quaresma', nat: 'Portugal', cl: ['Sporting', 'Barcelona', 'Porto', 'Inter', 'Beşiktaş'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // Inglaterra
    { n: 'Peter Shilton', nat: 'Inglaterra', cl: ['Nottingham Forest'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Glenn Hoddle', nat: 'Inglaterra', cl: ['Tottenham', 'Monaco'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Chris Waddle', nat: 'Inglaterra', cl: ['Tottenham', 'Marseille'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'David Seaman', nat: 'Inglaterra', cl: ['Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Tony Adams', nat: 'Inglaterra', cl: ['Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Paul Gascoigne', nat: 'Inglaterra', cl: ['Tottenham', 'Lazio'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Joe Cole', nat: 'Inglaterra', cl: ['West Ham', 'Chelsea', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Italia
    { n: 'Marco Tardelli', nat: 'Italia', cl: ['Juventus', 'Inter'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Roberto Mancini', nat: 'Italia', cl: ['Sampdoria', 'Lazio'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Gianluca Vialli', nat: 'Italia', cl: ['Sampdoria', 'Juventus', 'Chelsea'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Fabrizio Ravanelli', nat: 'Italia', cl: ['Juventus', 'Middlesbrough', 'Lazio'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Ciro Immobile', nat: 'Italia', cl: ['Borussia Dortmund', 'Sevilla', 'Lazio'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // Alemania
    { n: 'Günter Netzer', nat: 'Alemania', cl: ['Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Stefan Effenberg', nat: 'Alemania', cl: ['Bayern Munich', 'Fiorentina'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Mehmet Scholl', nat: 'Alemania', cl: ['Bayern Munich'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Mario Gómez', nat: 'Alemania', cl: ['Bayern Munich', 'Fiorentina'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // Países Bajos
    { n: 'Aron Winter', nat: 'Países Bajos', cl: ['Ajax', 'Lazio', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Hungría / Escocia (leyendas)
    { n: 'Ferenc Puskás', nat: 'Hungría', cl: ['Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Kenny Dalglish', nat: 'Escocia', cl: ['Celtic', 'Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Graeme Souness', nat: 'Escocia', cl: ['Liverpool', 'Sampdoria'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Denis Law', nat: 'Escocia', cl: ['Manchester United'], wc: 0, ucl: 0, bdo: 1, pos: 'DEL' },
    // Dinamarca
    { n: 'Allan Simonsen', nat: 'Dinamarca', cl: ['Barcelona'], wc: 0, ucl: 0, bdo: 1, pos: 'DEL' },
    // República Checa
    { n: 'Karel Poborský', nat: 'República Checa', cl: ['Manchester United', 'Lazio', 'Benfica'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Estados Unidos
    { n: 'Christian Pulisic', nat: 'Estados Unidos', cl: ['Borussia Dortmund', 'Chelsea', 'AC Milan'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Tim Howard', nat: 'Estados Unidos', cl: ['Manchester United', 'Everton'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    // Australia
    { n: 'Harry Kewell', nat: 'Australia', cl: ['Leeds', 'Liverpool', 'Galatasaray'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Tim Cahill', nat: 'Australia', cl: ['Everton'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },

    // ===== Quinta ampliación: leyendas que faltaban + cracks actuales =====
    { n: 'Garrincha', nat: 'Brasil', cl: ['Botafogo'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Paulo Roberto Falcão', nat: 'Brasil', cl: ['Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Claudio Caniggia', nat: 'Argentina', cl: ['Roma', 'Benfica', 'Atalanta'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Oscar Ruggeri', nat: 'Argentina', cl: ['Real Madrid'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Franco Mastantuono', nat: 'Argentina', cl: ['River Plate', 'Real Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Estêvão', nat: 'Brasil', cl: ['Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Just Fontaine', nat: 'Francia', cl: ['Reims'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Alain Giresse', nat: 'Francia', cl: ['Bordeaux', 'Marseille'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Basile Boli', nat: 'Francia', cl: ['Marseille', 'Rangers', 'Monaco'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Bradley Barcola', nat: 'Francia', cl: ['Lyon', 'PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Désiré Doué', nat: 'Francia', cl: ['Rennes', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Michael Olise', nat: 'Francia', cl: ['Bayern Munich'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Luis Enrique', nat: 'España', cl: ['Real Madrid', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Sergi Roberto', nat: 'España', cl: ['Barcelona'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Paulo Futre', nat: 'Portugal', cl: ['Porto', 'Atlético Madrid', 'AC Milan'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Renato Sanches', nat: 'Portugal', cl: ['Benfica', 'Bayern Munich', 'PSG', 'Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Nuno Mendes', nat: 'Portugal', cl: ['Sporting', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'João Neves', nat: 'Portugal', cl: ['Benfica', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Bryan Robson', nat: 'Inglaterra', cl: ['Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Cole Palmer', nat: 'Inglaterra', cl: ['Manchester City', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Gianni Rivera', nat: 'Italia', cl: ['AC Milan'], wc: 0, ucl: 1, bdo: 1, pos: 'MED' },
    { n: 'Sandro Mazzola', nat: 'Italia', cl: ['Inter'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Giacinto Facchetti', nat: 'Italia', cl: ['Inter'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Roberto Donadoni', nat: 'Italia', cl: ['AC Milan'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Federico Dimarco', nat: 'Italia', cl: ['Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Alessandro Bastoni', nat: 'Italia', cl: ['Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Uwe Seeler', nat: 'Alemania', cl: ['Hamburgo'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Bernd Schuster', nat: 'Alemania', cl: ['Barcelona', 'Real Madrid', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Johnny Rep', nat: 'Países Bajos', cl: ['Ajax', 'Valencia'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'John Charles', nat: 'Gales', cl: ['Leeds', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Gunnar Nordahl', nat: 'Suecia', cl: ['AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Alexander Isak', nat: 'Suecia', cl: ['Real Sociedad', 'Newcastle', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Krasimir Balakov', nat: 'Bulgaria', cl: ['Sporting'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Salomon Kalou', nat: 'Costa de Marfil', cl: ['Chelsea'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Emmanuel Eboué', nat: 'Costa de Marfil', cl: ['Arsenal', 'Galatasaray'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Abedi Pelé', nat: 'Ghana', cl: ['Marseille', 'Lyon'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Finidi George', nat: 'Nigeria', cl: ['Ajax', 'Betis'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Alen Bokšić', nat: 'Croacia', cl: ['Marseille', 'Lazio', 'Juventus'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Dan Petrescu', nat: 'Rumanía', cl: ['Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Takehiro Tomiyasu', nat: 'Japón', cl: ['Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Cha Bum-kun', nat: 'Corea del Sur', cl: ['Bayer Leverkusen'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Landon Donovan', nat: 'Estados Unidos', cl: ['LA Galaxy', 'Everton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Mark Viduka', nat: 'Australia', cl: ['Leeds', 'Newcastle'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Mario Yepes', nat: 'Colombia', cl: ['PSG', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Antonio Valencia', nat: 'Ecuador', cl: ['Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Moisés Caicedo', nat: 'Ecuador', cl: ['Brighton', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Rasmus Højlund', nat: 'Dinamarca', cl: ['Atalanta', 'Manchester United', 'Napoli'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Dominik Szoboszlai', nat: 'Hungría', cl: ['Salzburgo', 'RB Leipzig', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Arda Güler', nat: 'Turquía', cl: ['Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Khvicha Kvaratskhelia', nat: 'Georgia', cl: ['Napoli', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Giorgi Mamardashvili', nat: 'Georgia', cl: ['Valencia', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },

    // ===== Sexta ampliación: 300 más (cracks actuales y de todas las ligas) =====
    // --- Inglaterra ---
    { n: 'James Milner', nat: 'Inglaterra', cl: ['Aston Villa', 'Manchester City', 'Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Alex Oxlade-Chamberlain', nat: 'Inglaterra', cl: ['Arsenal', 'Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Adam Lallana', nat: 'Inglaterra', cl: ['Southampton', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'James Maddison', nat: 'Inglaterra', cl: ['Leicester', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Jarrod Bowen', nat: 'Inglaterra', cl: ['West Ham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Eberechi Eze', nat: 'Inglaterra', cl: ['Crystal Palace', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Anthony Gordon', nat: 'Inglaterra', cl: ['Everton', 'Newcastle'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Marc Guéhi', nat: 'Inglaterra', cl: ['Crystal Palace'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Levi Colwill', nat: 'Inglaterra', cl: ['Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Aaron Ramsdale', nat: 'Inglaterra', cl: ['Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Conor Gallagher', nat: 'Inglaterra', cl: ['Chelsea', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Ben Chilwell', nat: 'Inglaterra', cl: ['Leicester', 'Chelsea'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Tammy Abraham', nat: 'Inglaterra', cl: ['Chelsea', 'Roma', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Ollie Watkins', nat: 'Inglaterra', cl: ['Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Dele Alli', nat: 'Inglaterra', cl: ['Tottenham', 'Everton'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Eric Dier', nat: 'Inglaterra', cl: ['Tottenham', 'Bayern Munich'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Jesse Lingard', nat: 'Inglaterra', cl: ['Manchester United', 'West Ham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Micah Richards', nat: 'Inglaterra', cl: ['Manchester City', 'Fiorentina', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Gareth Barry', nat: 'Inglaterra', cl: ['Aston Villa', 'Manchester City', 'Everton'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Theo Walcott', nat: 'Inglaterra', cl: ['Arsenal', 'Everton', 'Southampton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Dominic Calvert-Lewin', nat: 'Inglaterra', cl: ['Everton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Kobbie Mainoo', nat: 'Inglaterra', cl: ['Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Ruben Loftus-Cheek', nat: 'Inglaterra', cl: ['Chelsea', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Emile Smith Rowe', nat: 'Inglaterra', cl: ['Arsenal', 'Fulham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Ross Barkley', nat: 'Inglaterra', cl: ['Everton', 'Chelsea', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Fikayo Tomori', nat: 'Inglaterra', cl: ['Chelsea', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Ivan Toney', nat: 'Inglaterra', cl: ['Brentford', 'Al-Ahli'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Nick Pope', nat: 'Inglaterra', cl: ['Burnley', 'Newcastle'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Kalvin Phillips', nat: 'Inglaterra', cl: ['Leeds', 'Manchester City'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Danny Welbeck', nat: 'Inglaterra', cl: ['Manchester United', 'Arsenal', 'Brighton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // --- España ---
    { n: 'Iker Muniain', nat: 'España', cl: ['Athletic'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Ander Herrera', nat: 'España', cl: ['Athletic', 'Manchester United', 'PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Juan Bernat', nat: 'España', cl: ['Valencia', 'Bayern Munich', 'PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Pau Torres', nat: 'España', cl: ['Villarreal', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Aymeric Laporte', nat: 'España', cl: ['Athletic', 'Manchester City', 'Al-Nassr'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Rodrigo Moreno', nat: 'España', cl: ['Valencia', 'Leeds'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Sergio Canales', nat: 'España', cl: ['Real Madrid', 'Valencia', 'Betis'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Marco Llorente', nat: 'España', cl: ['Real Madrid', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Kepa Arrizabalaga', nat: 'España', cl: ['Athletic', 'Chelsea', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Álex Grimaldo', nat: 'España', cl: ['Benfica', 'Bayer Leverkusen'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Mikel Merino', nat: 'España', cl: ['Real Sociedad', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Martín Zubimendi', nat: 'España', cl: ['Real Sociedad', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Álvaro Odriozola', nat: 'España', cl: ['Real Sociedad', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Iago Aspas', nat: 'España', cl: ['Celta', 'Liverpool', 'Sevilla'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Ansu Fati', nat: 'España', cl: ['Barcelona', 'Brighton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Fermín López', nat: 'España', cl: ['Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // --- Francia ---
    { n: 'Steve Mandanda', nat: 'Francia', cl: ['Marseille'], wc: 1, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Presnel Kimpembe', nat: 'Francia', cl: ['PSG'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Nabil Fekir', nat: 'Francia', cl: ['Lyon', 'Betis'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Moussa Sissoko', nat: 'Francia', cl: ['Newcastle', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Kurt Zouma', nat: 'Francia', cl: ['Chelsea', 'West Ham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Alphonse Areola', nat: 'Francia', cl: ['PSG', 'West Ham'], wc: 1, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Ferland Mendy', nat: 'Francia', cl: ['Lyon', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Wesley Fofana', nat: 'Francia', cl: ['Leicester', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Ibrahima Konaté', nat: 'Francia', cl: ['RB Leipzig', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Youssouf Fofana', nat: 'Francia', cl: ['Monaco', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Jonathan Clauss', nat: 'Francia', cl: ['Lens', 'Marseille'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Marcus Thuram', nat: 'Francia', cl: ['Borussia Mönchengladbach', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Christopher Nkunku', nat: 'Francia', cl: ['PSG', 'RB Leipzig', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Wissam Ben Yedder', nat: 'Francia', cl: ['Sevilla', 'Monaco'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // --- Italia ---
    { n: 'Salvatore Sirigu', nat: 'Italia', cl: ['PSG', 'Torino'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Andrea Belotti', nat: 'Italia', cl: ['Torino', 'Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Federico Bernardeschi', nat: 'Italia', cl: ['Fiorentina', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Manuel Locatelli', nat: 'Italia', cl: ['AC Milan', 'Sassuolo', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Sandro Tonali', nat: 'Italia', cl: ['AC Milan', 'Newcastle'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Gianluca Scamacca', nat: 'Italia', cl: ['West Ham', 'Atalanta'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Mateo Retegui', nat: 'Italia', cl: ['Genoa', 'Atalanta'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Nicolò Zaniolo', nat: 'Italia', cl: ['Roma', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Alessandro Florenzi', nat: 'Italia', cl: ['Roma', 'PSG', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Ciro Ferrara', nat: 'Italia', cl: ['Napoli', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Fabio Cannavaro', nat: 'Italia', cl: ['Napoli', 'Parma', 'Inter', 'Juventus', 'Real Madrid'], wc: 1, ucl: 0, bdo: 1, pos: 'DEF', _skip: 1 },
    { n: 'Simone Inzaghi', nat: 'Italia', cl: ['Lazio'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // --- Alemania ---
    { n: 'Marc-André ter Stegen', nat: 'Alemania', cl: ['Borussia Mönchengladbach', 'Barcelona'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Emre Can', nat: 'Alemania', cl: ['Bayer Leverkusen', 'Liverpool', 'Juventus', 'Borussia Dortmund'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Julian Weigl', nat: 'Alemania', cl: ['Borussia Dortmund', 'Benfica'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Kevin Volland', nat: 'Alemania', cl: ['Bayer Leverkusen', 'Monaco'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Leon Goretzka', nat: 'Alemania', cl: ['Schalke 04', 'Bayern Munich'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Niklas Süle', nat: 'Alemania', cl: ['Bayern Munich', 'Borussia Dortmund'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Thilo Kehrer', nat: 'Alemania', cl: ['Schalke 04', 'PSG', 'West Ham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Timo Werner', nat: 'Alemania', cl: ['RB Leipzig', 'Chelsea', 'Tottenham'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Julian Brandt', nat: 'Alemania', cl: ['Bayer Leverkusen', 'Borussia Dortmund'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Robin Gosens', nat: 'Alemania', cl: ['Atalanta', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Karim Adeyemi', nat: 'Alemania', cl: ['Borussia Dortmund'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // --- Portugal ---
    { n: 'Danilo Pereira', nat: 'Portugal', cl: ['Porto', 'PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'João Palhinha', nat: 'Portugal', cl: ['Sporting', 'Fulham', 'Bayern Munich'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Diogo Dalot', nat: 'Portugal', cl: ['Porto', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Pedro Neto', nat: 'Portugal', cl: ['Wolves', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Gonçalo Inácio', nat: 'Portugal', cl: ['Sporting'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Otávio', nat: 'Portugal', cl: ['Porto', 'Al-Nassr'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Matheus Nunes', nat: 'Portugal', cl: ['Sporting', 'Wolves', 'Manchester City'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // --- Países Bajos ---
    { n: 'Stefan de Vrij', nat: 'Países Bajos', cl: ['Feyenoord', 'Lazio', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Steven Bergwijn', nat: 'Países Bajos', cl: ['PSV', 'Tottenham', 'Ajax'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Donny van de Beek', nat: 'Países Bajos', cl: ['Ajax', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Ryan Gravenberch', nat: 'Países Bajos', cl: ['Ajax', 'Bayern Munich', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Xavi Simons', nat: 'Países Bajos', cl: ['PSV', 'RB Leipzig', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Wout Weghorst', nat: 'Países Bajos', cl: ['Burnley', 'Manchester United', 'Ajax'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Micky van de Ven', nat: 'Países Bajos', cl: ['Wolfsburg', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Jurriën Timber', nat: 'Países Bajos', cl: ['Ajax', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // --- Bélgica ---
    { n: 'Simon Mignolet', nat: 'Bélgica', cl: ['Liverpool', 'Club Brugge'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Thomas Meunier', nat: 'Bélgica', cl: ['PSG', 'Borussia Dortmund'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Leander Dendoncker', nat: 'Bélgica', cl: ['Anderlecht', 'Wolves', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Charles De Ketelaere', nat: 'Bélgica', cl: ['AC Milan', 'Atalanta'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Jérémy Doku', nat: 'Bélgica', cl: ['Rennes', 'Manchester City'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Amadou Onana', nat: 'Bélgica', cl: ['Everton', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // --- Croacia ---
    { n: 'Šime Vrsaljko', nat: 'Croacia', cl: ['Sassuolo', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Andrej Kramarić', nat: 'Croacia', cl: ['Leicester', 'Hoffenheim'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Mario Pašalić', nat: 'Croacia', cl: ['Chelsea', 'Atalanta'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Ante Rebić', nat: 'Croacia', cl: ['Fiorentina', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // --- Serbia ---
    { n: 'Nemanja Matić', nat: 'Serbia', cl: ['Chelsea', 'Manchester United', 'Roma'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Aleksandar Kolarov', nat: 'Serbia', cl: ['Manchester City', 'Roma', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Aleksandar Mitrović', nat: 'Serbia', cl: ['Newcastle', 'Fulham', 'Al-Hilal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Filip Kostić', nat: 'Serbia', cl: ['Hamburgo', 'Eintracht Frankfurt', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Luka Jović', nat: 'Serbia', cl: ['Eintracht Frankfurt', 'Real Madrid', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // --- Suiza (nueva) ---
    { n: 'Xherdan Shaqiri', nat: 'Suiza', cl: ['Bayern Munich', 'Inter', 'Stoke', 'Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Granit Xhaka', nat: 'Suiza', cl: ['Borussia Mönchengladbach', 'Arsenal', 'Bayer Leverkusen'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Yann Sommer', nat: 'Suiza', cl: ['Borussia Mönchengladbach', 'Bayern Munich', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Manuel Akanji', nat: 'Suiza', cl: ['Borussia Dortmund', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Breel Embolo', nat: 'Suiza', cl: ['Schalke 04', 'Monaco'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // --- Escandinavia / Norte ---
    { n: 'Emil Forsberg', nat: 'Suecia', cl: ['RB Leipzig'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Victor Lindelöf', nat: 'Suecia', cl: ['Benfica', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Dejan Kulusevski', nat: 'Suecia', cl: ['Parma', 'Juventus', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Simon Kjær', nat: 'Dinamarca', cl: ['Palermo', 'Sevilla', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Pierre-Emile Højbjerg', nat: 'Dinamarca', cl: ['Bayern Munich', 'Southampton', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Andreas Christensen', nat: 'Dinamarca', cl: ['Chelsea', 'Barcelona'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Alexander Sørloth', nat: 'Noruega', cl: ['Crystal Palace', 'RB Leipzig', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Kristoffer Ajer', nat: 'Noruega', cl: ['Celtic', 'Brentford'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Teemu Pukki', nat: 'Finlandia', cl: ['Schalke 04', 'Celtic', 'Norwich'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // --- Polonia ---
    { n: 'Łukasz Piszczek', nat: 'Polonia', cl: ['Borussia Dortmund'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Jakub Błaszczykowski', nat: 'Polonia', cl: ['Borussia Dortmund', 'Fiorentina'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Grzegorz Krychowiak', nat: 'Polonia', cl: ['Sevilla', 'PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Nicola Zalewski', nat: 'Polonia', cl: ['Roma', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // --- Ucrania ---
    { n: 'Ruslan Malinovskyi', nat: 'Ucrania', cl: ['Atalanta', 'Genoa'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Mykhailo Mudryk', nat: 'Ucrania', cl: ['Shakhtar', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // --- Rusia ---
    { n: 'Andrei Arshavin', nat: 'Rusia', cl: ['Zenit', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Aleksandr Kerzhakov', nat: 'Rusia', cl: ['Zenit', 'Sevilla'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // --- Turquía ---
    { n: 'Rüştü Reçber', nat: 'Turquía', cl: ['Fenerbahçe', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Nuri Şahin', nat: 'Turquía', cl: ['Borussia Dortmund', 'Real Madrid', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Merih Demiral', nat: 'Turquía', cl: ['Juventus', 'Atalanta', 'Al-Ahli'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Hakan Şükür', nat: 'Turquía', cl: ['Galatasaray', 'Inter', 'Blackburn'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // --- Grecia (nueva) ---
    { n: 'Giorgos Karagounis', nat: 'Grecia', cl: ['Inter', 'Panathinaikos'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Kostas Manolas', nat: 'Grecia', cl: ['Roma', 'Napoli'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Sokratis Papastathopoulos', nat: 'Grecia', cl: ['Borussia Dortmund', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // --- México ---
    { n: 'Andrés Guardado', nat: 'México', cl: ['Valencia', 'PSV', 'Betis'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Héctor Herrera', nat: 'México', cl: ['Porto', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Hirving Lozano', nat: 'México', cl: ['PSV', 'Napoli'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Carlos Vela', nat: 'México', cl: ['Arsenal', 'Real Sociedad', 'LA Galaxy'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Raúl Jiménez', nat: 'México', cl: ['Atlético Madrid', 'Benfica', 'Wolves', 'Fulham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Edson Álvarez', nat: 'México', cl: ['Ajax', 'West Ham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // --- Colombia ---
    { n: 'Jhon Córdoba', nat: 'Colombia', cl: ['Mainz', 'Krasnodar'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Jefferson Lerma', nat: 'Colombia', cl: ['Levante', 'Bournemouth', 'Crystal Palace'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Luis Muriel', nat: 'Colombia', cl: ['Sevilla', 'Atalanta'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Duván Zapata', nat: 'Colombia', cl: ['Napoli', 'Atalanta', 'Torino'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Dávinson Sánchez', nat: 'Colombia', cl: ['Ajax', 'Tottenham', 'Galatasaray'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Jhon Durán', nat: 'Colombia', cl: ['Aston Villa', 'Al-Nassr'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // --- Uruguay ---
    { n: 'Fernando Muslera', nat: 'Uruguay', cl: ['Lazio', 'Galatasaray'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Matías Vecino', nat: 'Uruguay', cl: ['Fiorentina', 'Inter', 'Lazio'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Lucas Torreira', nat: 'Uruguay', cl: ['Sampdoria', 'Arsenal', 'Galatasaray'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Nahitan Nández', nat: 'Uruguay', cl: ['Boca Juniors', 'Cagliari'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // --- Chile ---
    { n: 'Mauricio Isla', nat: 'Chile', cl: ['Udinese', 'Juventus', 'Marseille'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Jean Beausejour', nat: 'Chile', cl: ['Birmingham', 'Wigan'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Ben Brereton Díaz', nat: 'Chile', cl: ['Blackburn', 'Villarreal', 'Southampton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // --- Argentina (más) ---
    { n: 'Germán Pezzella', nat: 'Argentina', cl: ['Betis', 'Fiorentina'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Nahuel Molina', nat: 'Argentina', cl: ['Udinese', 'Atlético Madrid'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Gonzalo Montiel', nat: 'Argentina', cl: ['River Plate', 'Sevilla', 'Nottingham Forest'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Giovani Lo Celso', nat: 'Argentina', cl: ['PSG', 'Tottenham', 'Betis'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Guido Rodríguez', nat: 'Argentina', cl: ['Betis', 'West Ham'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Nicolás González', nat: 'Argentina', cl: ['Stuttgart', 'Fiorentina', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Gerónimo Rulli', nat: 'Argentina', cl: ['Real Sociedad', 'Ajax', 'Marseille'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Marcos Senesi', nat: 'Argentina', cl: ['Feyenoord', 'Bournemouth'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Alejandro Garnacho', nat: 'Argentina', cl: ['Manchester United', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Valentín Barco', nat: 'Argentina', cl: ['Boca Juniors', 'Brighton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Facundo Buonanotte', nat: 'Argentina', cl: ['Brighton', 'Leicester'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // --- Brasil (más) ---
    { n: 'Éderson', nat: 'Brasil', cl: ['Salzburgo', 'Atalanta'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Lucas Paquetá', nat: 'Brasil', cl: ['AC Milan', 'Lyon', 'West Ham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Bruno Guimarães', nat: 'Brasil', cl: ['Athletico Paranaense', 'Lyon', 'Newcastle'], wc: 0, ucl: 0, bdo: 0, pos: 'MED', _skip: 1 },
    { n: 'Raphinha', nat: 'Brasil', cl: ['Leeds', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Danilo', nat: 'Brasil', cl: ['Porto', 'Real Madrid', 'Manchester City', 'Juventus'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Wendell', nat: 'Brasil', cl: ['Bayer Leverkusen', 'Porto'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Gabriel Martinelli', nat: 'Brasil', cl: ['Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'André', nat: 'Brasil', cl: ['Fluminense', 'Wolves'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Savinho', nat: 'Brasil', cl: ['Girona', 'Manchester City'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Douglas Luiz', nat: 'Brasil', cl: ['Manchester City', 'Aston Villa', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // --- África ---
    { n: 'Yaya Touré', nat: 'Costa de Marfil', cl: ['Barcelona', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'MED', _skip: 1 },
    { n: 'Serge Aurier', nat: 'Costa de Marfil', cl: ['PSG', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Franck Kessié', nat: 'Costa de Marfil', cl: ['Atalanta', 'AC Milan', 'Barcelona', 'Al-Ahli'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Nicolas Pépé', nat: 'Costa de Marfil', cl: ['Lille', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Sébastien Haller', nat: 'Costa de Marfil', cl: ['Ajax', 'West Ham', 'Borussia Dortmund'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Vincent Aboubakar', nat: 'Camerún', cl: ['Porto', 'Beşiktaş'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Joel Matip', nat: 'Camerún', cl: ['Schalke 04', 'Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'André-Frank Zambo Anguissa', nat: 'Camerún', cl: ['Fulham', 'Napoli'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Asamoah Gyan', nat: 'Ghana', cl: ['Udinese', 'Rennes', 'Sunderland'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Mohammed Kudus', nat: 'Ghana', cl: ['Ajax', 'West Ham', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Wilfried Bony', nat: 'Costa de Marfil', cl: ['Swansea', 'Manchester City'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Kelechi Iheanacho', nat: 'Nigeria', cl: ['Manchester City', 'Leicester'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Wilfred Ndidi', nat: 'Nigeria', cl: ['Leicester'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Alex Iwobi', nat: 'Nigeria', cl: ['Arsenal', 'Everton', 'Fulham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Riyad Mahrez', nat: 'Argelia', cl: ['Leicester', 'Manchester City', 'Al-Ahli'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL', _skip: 1 },
    { n: 'Islam Slimani', nat: 'Argelia', cl: ['Sporting', 'Leicester', 'Monaco'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Yassine Bounou', nat: 'Marruecos', cl: ['Girona', 'Sevilla', 'Al-Hilal'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Noussair Mazraoui', nat: 'Marruecos', cl: ['Ajax', 'Bayern Munich', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Brahim Díaz', nat: 'Marruecos', cl: ['Manchester City', 'AC Milan', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Mohamed Salah', nat: 'Egipto', cl: ['Basilea', 'Chelsea', 'Roma', 'Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL', _skip: 1 },
    { n: 'Trézéguet', nat: 'Egipto', cl: ['Kasımpaşa', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // --- Asia / otros ---
    { n: 'Sardar Azmoun', nat: 'Irán', cl: ['Zenit', 'Bayer Leverkusen', 'Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Mehdi Taremi', nat: 'Irán', cl: ['Porto', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Wataru Endo', nat: 'Japón', cl: ['Stuttgart', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Kaoru Mitoma', nat: 'Japón', cl: ['Brighton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Daichi Kamada', nat: 'Japón', cl: ['Eintracht Frankfurt', 'Lazio', 'Crystal Palace'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Kim Min-jae', nat: 'Corea del Sur', cl: ['Napoli', 'Bayern Munich'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Hwang Hee-chan', nat: 'Corea del Sur', cl: ['Salzburgo', 'RB Leipzig', 'Wolves'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Weston McKennie', nat: 'Estados Unidos', cl: ['Schalke 04', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Tyler Adams', nat: 'Estados Unidos', cl: ['RB Leipzig', 'Leeds', 'Bournemouth'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Tim Weah', nat: 'Estados Unidos', cl: ['PSG', 'Lille', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Sergiño Dest', nat: 'Estados Unidos', cl: ['Ajax', 'Barcelona', 'PSV'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Yunus Musah', nat: 'Estados Unidos', cl: ['Valencia', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // --- Escocia ---
    { n: 'Andrew Robertson', nat: 'Escocia', cl: ['Hull', 'Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Scott McTominay', nat: 'Escocia', cl: ['Manchester United', 'Napoli'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Darren Fletcher', nat: 'Escocia', cl: ['Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Billy Gilmour', nat: 'Escocia', cl: ['Chelsea', 'Brighton', 'Napoli'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // --- Gales ---
    { n: 'Ramsey suplente', nat: 'Gales', cl: ['Cardiff'], wc: 0, ucl: 0, bdo: 0, pos: 'MED', _skip: 1 },
    { n: 'Ben Davies', nat: 'Gales', cl: ['Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Ethan Ampadu', nat: 'Gales', cl: ['Chelsea', 'Leeds'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Daniel James', nat: 'Gales', cl: ['Manchester United', 'Leeds'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // --- Austria ---
    { n: 'Christoph Baumgartner', nat: 'Austria', cl: ['Hoffenheim', 'RB Leipzig'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Konrad Laimer', nat: 'Austria', cl: ['RB Leipzig', 'Bayern Munich'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Xaver Schlager', nat: 'Austria', cl: ['Wolfsburg', 'RB Leipzig'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // --- Rep. Checa ---
    { n: 'Tomáš Rosický', nat: 'República Checa', cl: ['Borussia Dortmund', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Petr Čech b', nat: 'República Checa', cl: ['Chelsea'], wc: 0, ucl: 1, bdo: 0, pos: 'POR', _skip: 1 },
    { n: 'Vladimír Šmicer', nat: 'República Checa', cl: ['Lens', 'Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Patrik Schick', nat: 'República Checa', cl: ['Sampdoria', 'Roma', 'Bayer Leverkusen'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // --- Legendas extra ---
    { n: 'Davor Šuker b', nat: 'Croacia', cl: ['Sevilla'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL', _skip: 1 },
    { n: 'George Weah b', nat: 'Liberia', cl: ['AC Milan'], wc: 0, ucl: 0, bdo: 1, pos: 'DEL', _skip: 1 },
    { n: 'Roberto Baggio b', nat: 'Italia', cl: ['Juventus'], wc: 0, ucl: 0, bdo: 1, pos: 'DEL', _skip: 1 },
    // --- Más Premier / top ---
    { n: 'Bernardo Silva b', nat: 'Portugal', cl: ['Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'MED', _skip: 1 },
    { n: 'Bukayo Saka b', nat: 'Inglaterra', cl: ['Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL', _skip: 1 },

    // ===== Séptima ampliación: completar +300 =====
    // Leyendas
    { n: 'Lev Yashin', nat: 'Rusia', cl: ['Dínamo de Moscú'], wc: 0, ucl: 0, bdo: 1, pos: 'POR' },
    { n: 'Bobby Moore', nat: 'Inglaterra', cl: ['West Ham'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Geoff Hurst', nat: 'Inglaterra', cl: ['West Ham'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Gordon Banks', nat: 'Inglaterra', cl: ['Stoke'], wc: 1, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Rivelino', nat: 'Brasil', cl: ['Corinthians'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Jairzinho', nat: 'Brasil', cl: ['Botafogo'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Pep Guardiola', nat: 'España', cl: ['Barcelona', 'Roma'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Gaizka Mendieta', nat: 'España', cl: ['Valencia', 'Lazio', 'Middlesbrough'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Irlanda
    { n: 'Roy Keane', nat: 'Irlanda', cl: ['Nottingham Forest', 'Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Robbie Keane', nat: 'Irlanda', cl: ['Tottenham', 'Liverpool', 'LA Galaxy'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Damien Duff', nat: 'Irlanda', cl: ['Chelsea', 'Newcastle'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Shay Given', nat: 'Irlanda', cl: ['Newcastle', 'Manchester City', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    // Argentina
    { n: 'Nicolás Tagliafico', nat: 'Argentina', cl: ['Ajax', 'Lyon'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Marcos Acuña', nat: 'Argentina', cl: ['Sporting', 'Sevilla'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Alejandro Papu Gómez', nat: 'Argentina', cl: ['Atalanta', 'Sevilla'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Emiliano Buendía', nat: 'Argentina', cl: ['Norwich', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Thiago Almada', nat: 'Argentina', cl: ['Botafogo', 'Lyon'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    // Brasil
    { n: 'Diego Ribas', nat: 'Brasil', cl: ['Santos', 'Werder Bremen', 'Juventus', 'Wolfsburg', 'Atlético Madrid', 'Flamengo'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Alex Telles', nat: 'Brasil', cl: ['Porto', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Marquinhos', nat: 'Brasil', cl: ['Roma', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Bremer', nat: 'Brasil', cl: ['Torino', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Gerson', nat: 'Brasil', cl: ['Roma', 'Flamengo'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Vitor Roque', nat: 'Brasil', cl: ['Barcelona', 'Betis'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'João Pedro', nat: 'Brasil', cl: ['Watford', 'Brighton', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Matheus Cunha', nat: 'Brasil', cl: ['Atlético Madrid', 'Wolves', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // España
    { n: 'David Raya', nat: 'España', cl: ['Brentford', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Pau Cubarsí', nat: 'España', cl: ['Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Álex Baena', nat: 'España', cl: ['Villarreal', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Yeremy Pino', nat: 'España', cl: ['Villarreal', 'Crystal Palace'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // Francia
    { n: 'Lucas Digne', nat: 'Francia', cl: ['PSG', 'Roma', 'Barcelona', 'Everton', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Randal Kolo Muani', nat: 'Francia', cl: ['Eintracht Frankfurt', 'PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Warren Zaïre-Emery', nat: 'Francia', cl: ['PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Khéphren Thuram', nat: 'Francia', cl: ['Nice', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Italia
    { n: 'Riccardo Calafiori', nat: 'Italia', cl: ['Bologna', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Davide Frattesi', nat: 'Italia', cl: ['Sassuolo', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Moise Kean', nat: 'Italia', cl: ['Juventus', 'Everton', 'Fiorentina'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Giacomo Raspadori', nat: 'Italia', cl: ['Sassuolo', 'Napoli'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // Alemania
    { n: 'Nico Schlotterbeck', nat: 'Alemania', cl: ['Freiburg', 'Borussia Dortmund'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Pascal Groß', nat: 'Alemania', cl: ['Brighton', 'Borussia Dortmund'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Países Bajos
    { n: 'Teun Koopmeiners', nat: 'Países Bajos', cl: ['AZ', 'Atalanta', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Justin Kluivert', nat: 'Países Bajos', cl: ['Ajax', 'Roma', 'Bournemouth'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Tijjani Reijnders', nat: 'Países Bajos', cl: ['AZ', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Jeremie Frimpong', nat: 'Países Bajos', cl: ['Celtic', 'Bayer Leverkusen', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // Portugal
    { n: 'Francisco Trincão', nat: 'Portugal', cl: ['Barcelona', 'Sporting'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'João Mário', nat: 'Portugal', cl: ['Inter', 'Benfica'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'António Silva', nat: 'Portugal', cl: ['Benfica'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Francisco Conceição', nat: 'Portugal', cl: ['Porto', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // Bélgica
    { n: 'Yannick Carrasco', nat: 'Bélgica', cl: ['Monaco', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Michy Batshuayi', nat: 'Bélgica', cl: ['Chelsea', 'Marseille'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Thorgan Hazard', nat: 'Bélgica', cl: ['Borussia Dortmund'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Timothy Castagne', nat: 'Bélgica', cl: ['Atalanta', 'Leicester', 'Fulham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // Croacia / Serbia
    { n: 'Nikola Vlašić', nat: 'Croacia', cl: ['Everton', 'West Ham', 'Torino'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Nikola Milenković', nat: 'Serbia', cl: ['Fiorentina', 'Nottingham Forest'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // Inglaterra (más)
    { n: 'Morgan Gibbs-White', nat: 'Inglaterra', cl: ['Wolves', 'Nottingham Forest'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Ezri Konsa', nat: 'Inglaterra', cl: ['Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // África
    { n: 'Éric Bailly', nat: 'Costa de Marfil', cl: ['Villarreal', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Yves Bissouma', nat: 'Malí', cl: ['Brighton', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'André Ayew', nat: 'Ghana', cl: ['Marseille', 'Swansea', 'West Ham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Jordan Ayew', nat: 'Ghana', cl: ['Crystal Palace', 'Leicester'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // Colombia / Uruguay
    { n: 'Richard Ríos', nat: 'Colombia', cl: ['Palmeiras', 'Benfica'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Daniel Muñoz', nat: 'Colombia', cl: ['Genk', 'Crystal Palace'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Manuel Ugarte', nat: 'Uruguay', cl: ['Sporting', 'PSG', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Sebastián Coates', nat: 'Uruguay', cl: ['Liverpool', 'Sporting'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // Norte / Este de Europa
    { n: 'Sander Berge', nat: 'Noruega', cl: ['Sheffield United', 'Fulham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Jan Bednarek', nat: 'Polonia', cl: ['Southampton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Matty Cash', nat: 'Polonia', cl: ['Nottingham Forest', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Ricardo Rodríguez', nat: 'Suiza', cl: ['Wolfsburg', 'AC Milan', 'Torino'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Remo Freuler', nat: 'Suiza', cl: ['Atalanta', 'Nottingham Forest', 'Bologna'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Asia / América
    { n: 'Takumi Minamino', nat: 'Japón', cl: ['Salzburgo', 'Liverpool', 'Monaco'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Gio Reyna', nat: 'Estados Unidos', cl: ['Borussia Dortmund'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Konstantinos Mavropanos', nat: 'Grecia', cl: ['Stuttgart', 'West Ham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Kenan Yıldız', nat: 'Turquía', cl: ['Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Ferdi Kadıoğlu', nat: 'Turquía', cl: ['Fenerbahçe', 'Brighton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },

    // ===== Octava ampliación (A): profundidad por clubes y selecciones =====
    // Real Madrid
    { n: 'Steve McManaman', nat: 'Inglaterra', cl: ['Liverpool', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Lucas Vázquez', nat: 'España', cl: ['Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Dani Ceballos', nat: 'España', cl: ['Real Madrid', 'Arsenal'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Julio Baptista', nat: 'Brasil', cl: ['Sevilla', 'Real Madrid', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Manolo Sanchís', nat: 'España', cl: ['Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Amancio', nat: 'España', cl: ['Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Julián Álvarez', nat: 'Argentina', cl: ['River Plate', 'Manchester City', 'Atlético Madrid'], wc: 1, ucl: 1, bdo: 0, pos: 'DEL', _skip: 1 },
    // Barcelona
    { n: 'Miralem Pjanić', nat: 'Bosnia', cl: ['Roma', 'Juventus', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Arthur Melo', nat: 'Brasil', cl: ['Barcelona', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Clément Lenglet', nat: 'Francia', cl: ['Sevilla', 'Barcelona', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Paulinho', nat: 'Brasil', cl: ['Tottenham', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'André Gomes', nat: 'Portugal', cl: ['Valencia', 'Barcelona', 'Everton'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Sergi Barjuán', nat: 'España', cl: ['Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // Bayern
    { n: 'Roy Makaay', nat: 'Países Bajos', cl: ['Deportivo', 'Bayern Munich'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Claudio Pizarro', nat: 'Perú', cl: ['Werder Bremen', 'Bayern Munich', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Javi Martínez', nat: 'España', cl: ['Athletic', 'Bayern Munich'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Dante', nat: 'Brasil', cl: ['Borussia Mönchengladbach', 'Bayern Munich', 'Nice'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Alphonso Davies', nat: 'Canadá', cl: ['Bayern Munich'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Dayot Upamecano', nat: 'Francia', cl: ['RB Leipzig', 'Bayern Munich'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // Manchester United
    { n: 'Nemanja Matić', nat: 'Serbia', cl: ['Benfica', 'Chelsea', 'Manchester United', 'Roma'], wc: 0, ucl: 1, bdo: 0, pos: 'MED', _skip: 1 },
    { n: 'Nani', nat: 'Portugal', cl: ['Sporting', 'Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL', _skip: 1 },
    { n: 'Antonio Valencia', nat: 'Ecuador', cl: ['Wigan', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'MED', _skip: 1 },
    { n: 'Juan Mata', nat: 'España', cl: ['Valencia', 'Chelsea', 'Manchester United'], wc: 1, ucl: 1, bdo: 0, pos: 'MED', _skip: 1 },
    { n: 'Chris Smalling', nat: 'Inglaterra', cl: ['Manchester United', 'Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Luke Shaw', nat: 'Inglaterra', cl: ['Southampton', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Nemanja Vidić', nat: 'Serbia', cl: ['Manchester United', 'Inter'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF', _skip: 1 },
    { n: 'Nani b', nat: 'Portugal', cl: ['Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL', _skip: 1 },
    { n: 'Anders Lindegaard', nat: 'Dinamarca', cl: ['Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Bruno Fernandes', nat: 'Portugal', cl: ['Sampdoria', 'Sporting', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'MED', _skip: 1 },
    // Chelsea
    { n: 'Gianfranco Zola', nat: 'Italia', cl: ['Napoli', 'Parma', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL', _skip: 1 },
    { n: 'Marcel Desailly', nat: 'Francia', cl: ['Marseille', 'AC Milan', 'Chelsea'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF', _skip: 1 },
    { n: 'Claude Makélélé', nat: 'Francia', cl: ['Nantes', 'Real Madrid', 'Chelsea', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'MED', _skip: 1 },
    { n: 'Ricardo Carvalho', nat: 'Portugal', cl: ['Porto', 'Chelsea', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF', _skip: 1 },
    { n: 'Michael Ballack', nat: 'Alemania', cl: ['Bayer Leverkusen', 'Bayern Munich', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'MED', _skip: 1 },
    { n: 'Andriy Shevchenko', nat: 'Ucrania', cl: ['Dinamo Kyiv', 'AC Milan', 'Chelsea'], wc: 0, ucl: 1, bdo: 1, pos: 'DEL', _skip: 1 },
    { n: 'Willian', nat: 'Brasil', cl: ['Shakhtar', 'Chelsea', 'Arsenal', 'Fulham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL', _skip: 1 },
    { n: 'Cesc Fàbregas', nat: 'España', cl: ['Arsenal', 'Barcelona', 'Chelsea', 'Monaco'], wc: 1, ucl: 0, bdo: 0, pos: 'MED', _skip: 1 },
    { n: 'Marcos Alonso', nat: 'España', cl: ['Fiorentina', 'Chelsea', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Antonio Rüdiger', nat: 'Alemania', cl: ['Stuttgart', 'Roma', 'Chelsea', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF', _skip: 1 },
    { n: 'Jorginho', nat: 'Italia', cl: ['Verona', 'Napoli', 'Chelsea', 'Arsenal'], wc: 0, ucl: 1, bdo: 0, pos: 'MED', _skip: 1 },
    { n: 'Enzo Fernández', nat: 'Argentina', cl: ['River Plate', 'Benfica', 'Chelsea'], wc: 1, ucl: 0, bdo: 0, pos: 'MED', _skip: 1 },
    { n: 'Christian Pulisic', nat: 'Estados Unidos', cl: ['Borussia Dortmund', 'Chelsea', 'AC Milan'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL', _skip: 1 },
    // Arsenal
    { n: 'Robert Pirès', nat: 'Francia', cl: ['Metz', 'Marseille', 'Arsenal'], wc: 1, ucl: 0, bdo: 0, pos: 'MED', _skip: 1 },
    { n: 'Freddie Ljungberg', nat: 'Suecia', cl: ['Arsenal', 'West Ham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED', _skip: 1 },
    { n: 'Robin van Persie', nat: 'Países Bajos', cl: ['Feyenoord', 'Arsenal', 'Manchester United', 'Fenerbahçe'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Sol Campbell', nat: 'Inglaterra', cl: ['Tottenham', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Emmanuel Petit', nat: 'Francia', cl: ['Monaco', 'Arsenal', 'Barcelona', 'Chelsea'], wc: 1, ucl: 0, bdo: 0, pos: 'MED', _skip: 1 },
    { n: 'Gilberto Silva', nat: 'Brasil', cl: ['Atlético Mineiro', 'Arsenal', 'Panathinaikos'], wc: 1, ucl: 0, bdo: 0, pos: 'MED', _skip: 1 },
    { n: 'Alexandre Lacazette', nat: 'Francia', cl: ['Lyon', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Gabriel Jesus', nat: 'Brasil', cl: ['Palmeiras', 'Manchester City', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL', _skip: 1 },
    { n: 'Kai Havertz', nat: 'Alemania', cl: ['Bayer Leverkusen', 'Chelsea', 'Arsenal'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL', _skip: 1 },
    { n: 'Gabriel Jesus b', nat: 'Brasil', cl: ['Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL', _skip: 1 },
    // Liverpool
    { n: 'Xabi Alonso', nat: 'España', cl: ['Real Sociedad', 'Liverpool', 'Real Madrid', 'Bayern Munich'], wc: 1, ucl: 1, bdo: 0, pos: 'MED', _skip: 1 },
    { n: 'Fernando Torres', nat: 'España', cl: ['Atlético Madrid', 'Liverpool', 'Chelsea'], wc: 1, ucl: 1, bdo: 0, pos: 'DEL', _skip: 1 },
    { n: 'Luis García', nat: 'España', cl: ['Barcelona', 'Liverpool', 'Atlético Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Dietmar Hamann', nat: 'Alemania', cl: ['Newcastle', 'Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Xherdan Shaqiri', nat: 'Suiza', cl: ['Basilea', 'Bayern Munich', 'Inter', 'Stoke', 'Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL', _skip: 1 },
    { n: 'Roberto Firmino', nat: 'Brasil', cl: ['Hoffenheim', 'Liverpool', 'Al-Ahli'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL', _skip: 1 },
    { n: 'Diogo Jota', nat: 'Portugal', cl: ['Atlético Madrid', 'Wolves', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL', _skip: 1 },
    { n: 'Emre Can', nat: 'Alemania', cl: ['Liverpool', 'Juventus', 'Borussia Dortmund'], wc: 0, ucl: 0, bdo: 0, pos: 'MED', _skip: 1 },
    { n: 'Joël Matip', nat: 'Camerún', cl: ['Schalke 04', 'Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Luis Díaz', nat: 'Colombia', cl: ['Porto', 'Liverpool', 'Bayern Munich'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL', _skip: 1 },
    // Juventus
    { n: 'Pavel Nedvěd', nat: 'República Checa', cl: ['Lazio', 'Juventus'], wc: 0, ucl: 0, bdo: 1, pos: 'MED', _skip: 1 },
    { n: 'David Trezeguet', nat: 'Francia', cl: ['Monaco', 'Juventus'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL', _skip: 1 },
    { n: 'Mauro Camoranesi', nat: 'Argentina', cl: ['Verona', 'Juventus'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Claudio Marchisio', nat: 'Italia', cl: ['Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Arturo Vidal', nat: 'Chile', cl: ['Bayer Leverkusen', 'Juventus', 'Bayern Munich', 'Barcelona', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'MED', _skip: 1 },
    { n: 'Carlos Tevez', nat: 'Argentina', cl: ['Corinthians', 'West Ham', 'Manchester United', 'Manchester City', 'Juventus'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL', _skip: 1 },
    { n: 'Simone Pepe', nat: 'Italia', cl: ['Udinese', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Weston McKennie', nat: 'Estados Unidos', cl: ['Schalke 04', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'MED', _skip: 1 },
    // Inter
    { n: 'Iván Córdoba', nat: 'Colombia', cl: ['Inter'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Marco Materazzi', nat: 'Italia', cl: ['Everton', 'Perugia', 'Inter'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF', _skip: 1 },
    { n: 'Diego Milito', nat: 'Argentina', cl: ['Genoa', 'Zaragoza', 'Inter'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Goran Pandev', nat: 'Macedonia del Norte', cl: ['Lazio', 'Inter', 'Genoa'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Thiago Motta', nat: 'Italia', cl: ['Barcelona', 'Inter', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Mauro Icardi', nat: 'Argentina', cl: ['Sampdoria', 'Inter', 'PSG', 'Galatasaray'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL', _skip: 1 },
    { n: 'Milan Škriniar', nat: 'Eslovaquia', cl: ['Sampdoria', 'Inter', 'PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Henrikh Mkhitaryan', nat: 'Armenia', cl: ['Borussia Dortmund', 'Manchester United', 'Roma', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Lautaro Martínez', nat: 'Argentina', cl: ['Racing', 'Inter'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL', _skip: 1 },
    // AC Milan
    { n: 'Marco van Basten', nat: 'Países Bajos', cl: ['Ajax', 'AC Milan'], wc: 0, ucl: 1, bdo: 1, pos: 'DEL', _skip: 1 },
    { n: 'George Weah', nat: 'Liberia', cl: ['Monaco', 'PSG', 'AC Milan', 'Chelsea'], wc: 0, ucl: 0, bdo: 1, pos: 'DEL', _skip: 1 },
    { n: 'Massimo Ambrosini', nat: 'Italia', cl: ['AC Milan'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Serginho', nat: 'Brasil', cl: ['AC Milan'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Ignazio Abate', nat: 'Italia', cl: ['AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Stephan El Shaarawy', nat: 'Italia', cl: ['AC Milan', 'Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Keisuke Honda', nat: 'Japón', cl: ['CSKA Moscú', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'MED', _skip: 1 },
    { n: 'Theo Hernández', nat: 'Francia', cl: ['Atlético Madrid', 'Real Madrid', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Christian Pulisic b', nat: 'Estados Unidos', cl: ['AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL', _skip: 1 },
    // Selecciones nuevas / refuerzo
    { n: 'Paolo Guerrero', nat: 'Perú', cl: ['Bayern Munich', 'Hamburgo'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Jefferson Farfán', nat: 'Perú', cl: ['PSV', 'Schalke 04'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Jonathan David', nat: 'Canadá', cl: ['Lille', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Edin Džeko', nat: 'Bosnia', cl: ['Wolfsburg', 'Manchester City', 'Roma', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Miralem Pjanić b', nat: 'Bosnia', cl: ['Lyon'], wc: 0, ucl: 0, bdo: 0, pos: 'MED', _skip: 1 },
    { n: 'Marek Hamšík', nat: 'Eslovaquia', cl: ['Napoli'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Robert Vittek', nat: 'Eslovaquia', cl: ['Núremberg', 'Lille'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Aleksandar Mitrović', nat: 'Serbia', cl: ['Anderlecht', 'Newcastle', 'Fulham', 'Al-Hilal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL', _skip: 1 },
    { n: 'Eljif Elmas', nat: 'Macedonia del Norte', cl: ['Napoli', 'RB Leipzig'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Ezgjan Alioski', nat: 'Macedonia del Norte', cl: ['Leeds'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Aleksandar Trajkovski', nat: 'Macedonia del Norte', cl: ['Palermo', 'Mallorca'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Marc-André ter Stegen', nat: 'Alemania', cl: ['Borussia Mönchengladbach', 'Barcelona'], wc: 0, ucl: 1, bdo: 0, pos: 'POR', _skip: 1 },

    // ===== Octava ampliación (B): jugadores realmente nuevos =====
    // España
    { n: 'Raúl Albiol', nat: 'España', cl: ['Valencia', 'Real Madrid', 'Napoli', 'Villarreal'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Juanfran', nat: 'España', cl: ['Osasuna', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Gabi', nat: 'España', cl: ['Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Jesús Navas', nat: 'España', cl: ['Sevilla', 'Manchester City'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Fernando Llorente', nat: 'España', cl: ['Athletic', 'Juventus', 'Sevilla', 'Tottenham'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Álvaro Negredo', nat: 'España', cl: ['Sevilla', 'Manchester City', 'Valencia'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Carlos Marchena', nat: 'España', cl: ['Valencia', 'Villarreal'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Rubén Baraja', nat: 'España', cl: ['Valencia'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'David Albelda', nat: 'España', cl: ['Valencia'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Vicente', nat: 'España', cl: ['Valencia', 'Brighton'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Aritz Aduriz', nat: 'España', cl: ['Athletic', 'Mallorca'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Suso', nat: 'España', cl: ['Liverpool', 'AC Milan', 'Sevilla'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Vitolo', nat: 'España', cl: ['Sevilla', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // Italia
    { n: 'Angelo Peruzzi', nat: 'Italia', cl: ['Juventus', 'Inter', 'Lazio'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Antonio Di Natale', nat: 'Italia', cl: ['Udinese'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Fabio Quagliarella', nat: 'Italia', cl: ['Udinese', 'Napoli', 'Juventus', 'Sampdoria'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Antonio Candreva', nat: 'Italia', cl: ['Lazio', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Sebastian Giovinco', nat: 'Italia', cl: ['Juventus', 'Parma'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Graziano Pellè', nat: 'Italia', cl: ['Feyenoord', 'Southampton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Domenico Berardi', nat: 'Italia', cl: ['Sassuolo'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Bryan Cristante', nat: 'Italia', cl: ['AC Milan', 'Atalanta', 'Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Gianluca Mancini', nat: 'Italia', cl: ['Atalanta', 'Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Alessio Romagnoli', nat: 'Italia', cl: ['AC Milan', 'Lazio'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Mattia De Sciglio', nat: 'Italia', cl: ['AC Milan', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Angelo Ogbonna', nat: 'Italia', cl: ['Torino', 'Juventus', 'West Ham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Leonardo Spinazzola', nat: 'Italia', cl: ['Juventus', 'Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // Alemania
    { n: 'Bernd Leno', nat: 'Alemania', cl: ['Bayer Leverkusen', 'Arsenal', 'Fulham'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Shkodran Mustafi', nat: 'Alemania', cl: ['Sampdoria', 'Valencia', 'Arsenal'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Matthias Ginter', nat: 'Alemania', cl: ['Freiburg', 'Borussia Dortmund', 'Borussia Mönchengladbach'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Kevin Trapp', nat: 'Alemania', cl: ['PSG', 'Eintracht Frankfurt'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Roman Weidenfeller', nat: 'Alemania', cl: ['Borussia Dortmund'], wc: 1, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Kevin Großkreutz', nat: 'Alemania', cl: ['Borussia Dortmund'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    // Francia
    { n: 'Bacary Sagna', nat: 'Francia', cl: ['Arsenal', 'Manchester City'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Mamadou Sakho', nat: 'Francia', cl: ['PSG', 'Liverpool', 'Crystal Palace'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Laurent Koscielny', nat: 'Francia', cl: ['Arsenal', 'Bordeaux'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Yohan Cabaye', nat: 'Francia', cl: ['Lille', 'Newcastle', 'PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Dimitri Payet', nat: 'Francia', cl: ['Lille', 'Marseille', 'West Ham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Tanguy Ndombele', nat: 'Francia', cl: ['Lyon', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Bafétimbi Gomis', nat: 'Francia', cl: ['Lyon', 'Swansea', 'Galatasaray'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Jérémy Ménez', nat: 'Francia', cl: ['Roma', 'PSG', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Hatem Ben Arfa', nat: 'Francia', cl: ['Marseille', 'Newcastle', 'PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Alexandre Lacazette', nat: 'Francia', cl: ['Lyon', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // Inglaterra
    { n: 'Ledley King', nat: 'Inglaterra', cl: ['Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Gary Cahill', nat: 'Inglaterra', cl: ['Bolton', 'Chelsea', 'Crystal Palace'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Glen Johnson', nat: 'Inglaterra', cl: ['Chelsea', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Peter Crouch', nat: 'Inglaterra', cl: ['Liverpool', 'Tottenham', 'Stoke'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Jermain Defoe', nat: 'Inglaterra', cl: ['Tottenham', 'Sunderland'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Phil Jones', nat: 'Inglaterra', cl: ['Blackburn', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // Países Bajos
    { n: 'John Heitinga', nat: 'Países Bajos', cl: ['Ajax', 'Atlético Madrid', 'Everton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Kevin Strootman', nat: 'Países Bajos', cl: ['PSV', 'Roma', 'Marseille'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Quincy Promes', nat: 'Países Bajos', cl: ['Sevilla', 'Ajax'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Davy Klaassen', nat: 'Países Bajos', cl: ['Ajax', 'Everton', 'Werder Bremen'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Luuk de Jong', nat: 'Países Bajos', cl: ['Sevilla', 'Barcelona', 'PSV'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Gregory van der Wiel', nat: 'Países Bajos', cl: ['Ajax', 'PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // Portugal
    { n: 'José Bosingwa', nat: 'Portugal', cl: ['Porto', 'Chelsea', 'QPR'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Tiago Mendes', nat: 'Portugal', cl: ['Chelsea', 'Lyon', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Éder', nat: 'Portugal', cl: ['Braga', 'Lille'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Cédric Soares', nat: 'Portugal', cl: ['Sporting', 'Southampton', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // Argentina
    { n: 'Javier Saviola', nat: 'Argentina', cl: ['River Plate', 'Barcelona', 'Real Madrid', 'Benfica'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Kily González', nat: 'Argentina', cl: ['Valencia', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Lucho González', nat: 'Argentina', cl: ['Porto', 'Marseille'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Rodrigo Palacio', nat: 'Argentina', cl: ['Boca Juniors', 'Genoa', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Ezequiel Lavezzi', nat: 'Argentina', cl: ['Napoli', 'PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Marcelo Gallardo', nat: 'Argentina', cl: ['River Plate', 'Monaco', 'PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Pablo Zabaleta', nat: 'Argentina', cl: ['Espanyol', 'Manchester City', 'West Ham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Federico Fernández', nat: 'Argentina', cl: ['Napoli', 'Swansea', 'Newcastle'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Erik Lamela', nat: 'Argentina', cl: ['Roma', 'Tottenham', 'Sevilla'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Roberto Pereyra', nat: 'Argentina', cl: ['Udinese', 'Juventus', 'Watford'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Brasil
    { n: 'Denílson', nat: 'Brasil', cl: ['São Paulo', 'Betis'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Edmílson', nat: 'Brasil', cl: ['Lyon', 'Barcelona'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Sylvinho', nat: 'Brasil', cl: ['Arsenal', 'Celta', 'Barcelona'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Juliano Belletti', nat: 'Brasil', cl: ['Villarreal', 'Barcelona', 'Chelsea'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Giovane Élber', nat: 'Brasil', cl: ['Stuttgart', 'Bayern Munich', 'Lyon'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Luís Fabiano', nat: 'Brasil', cl: ['Sevilla', 'São Paulo'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Elano', nat: 'Brasil', cl: ['Shakhtar', 'Manchester City'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Lucas Moura', nat: 'Brasil', cl: ['São Paulo', 'PSG', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Fred', nat: 'Brasil', cl: ['Shakhtar', 'Manchester United', 'Fenerbahçe'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Alex Sandro', nat: 'Brasil', cl: ['Porto', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Miranda', nat: 'Brasil', cl: ['Atlético Madrid', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Filipe Luís', nat: 'Brasil', cl: ['Deportivo', 'Atlético Madrid', 'Chelsea', 'Flamengo'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // Bosnia / Eslovaquia / Eslovenia / Macedonia
    { n: 'Vedad Ibišević', nat: 'Bosnia', cl: ['Hoffenheim', 'Stuttgart', 'Hertha'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Marek Hamšík', nat: 'Eslovaquia', cl: ['Napoli'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Martin Škrtel', nat: 'Eslovaquia', cl: ['Zenit', 'Liverpool', 'Fenerbahçe'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Milan Škriniar', nat: 'Eslovaquia', cl: ['Sampdoria', 'Inter', 'PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Josip Iličić', nat: 'Eslovenia', cl: ['Palermo', 'Fiorentina', 'Atalanta'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Samir Handanović', nat: 'Eslovenia', cl: ['Udinese', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Benjamin Šeško', nat: 'Eslovenia', cl: ['RB Leipzig', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Goran Pandev', nat: 'Macedonia del Norte', cl: ['Lazio', 'Inter', 'Genoa'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Eljif Elmas', nat: 'Macedonia del Norte', cl: ['Napoli', 'RB Leipzig'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // Escandinavia / Este
    { n: 'Daniel Agger', nat: 'Dinamarca', cl: ['Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Nicklas Bendtner', nat: 'Dinamarca', cl: ['Arsenal', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Yussuf Poulsen', nat: 'Dinamarca', cl: ['RB Leipzig'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Joachim Andersen', nat: 'Dinamarca', cl: ['Lyon', 'Crystal Palace', 'Fulham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Robin Olsen', nat: 'Suecia', cl: ['Roma', 'Everton', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'John Carew', nat: 'Noruega', cl: ['Valencia', 'Roma', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Kamil Glik', nat: 'Polonia', cl: ['Torino', 'Monaco'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Arkadiusz Milik', nat: 'Polonia', cl: ['Ajax', 'Napoli', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Krzysztof Piątek', nat: 'Polonia', cl: ['Genoa', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Yevhen Konoplyanka', nat: 'Ucrania', cl: ['Sevilla', 'Schalke 04'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // Reino Unido / Irlanda
    { n: 'Joe Allen', nat: 'Gales', cl: ['Swansea', 'Liverpool', 'Stoke'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Richard Dunne', nat: 'Irlanda', cl: ['Manchester City', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: "John O'Shea", nat: 'Irlanda', cl: ['Manchester United', 'Sunderland'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Séamus Coleman', nat: 'Irlanda', cl: ['Everton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Kieran Tierney', nat: 'Escocia', cl: ['Celtic', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // Turquía / Asia / Oceanía
    { n: 'Emre Belözoğlu', nat: 'Turquía', cl: ['Inter', 'Newcastle', 'Fenerbahçe'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Burak Yılmaz', nat: 'Turquía', cl: ['Galatasaray', 'Lille'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Cengiz Ünder', nat: 'Turquía', cl: ['Roma', 'Leicester', 'Fenerbahçe'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Çağlar Söyüncü', nat: 'Turquía', cl: ['Freiburg', 'Leicester', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Yuto Nagatomo', nat: 'Japón', cl: ['Cesena', 'Inter', 'Galatasaray'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Maya Yoshida', nat: 'Japón', cl: ['Southampton', 'Sampdoria'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Ki Sung-yueng', nat: 'Corea del Sur', cl: ['Swansea', 'Sunderland'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Aaron Mooy', nat: 'Australia', cl: ['Huddersfield', 'Brighton'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Mathew Ryan', nat: 'Australia', cl: ['Brighton', 'Real Sociedad'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Mile Jedinak', nat: 'Australia', cl: ['Crystal Palace', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // América
    { n: 'Clint Dempsey', nat: 'Estados Unidos', cl: ['Fulham', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Michael Bradley', nat: 'Estados Unidos', cl: ['Borussia Mönchengladbach', 'Roma', 'Toronto'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Brad Friedel', nat: 'Estados Unidos', cl: ['Liverpool', 'Blackburn', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Giovani dos Santos', nat: 'México', cl: ['Barcelona', 'Tottenham', 'LA Galaxy'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Héctor Moreno', nat: 'México', cl: ['Espanyol', 'PSV', 'Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Miguel Layún', nat: 'México', cl: ['Watford', 'Porto', 'Sevilla'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Jesús Corona', nat: 'México', cl: ['Porto', 'Sevilla'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Santiago Giménez', nat: 'México', cl: ['Feyenoord', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Carlos Bacca', nat: 'Colombia', cl: ['Sevilla', 'AC Milan', 'Villarreal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Juan Fernando Quintero', nat: 'Colombia', cl: ['Porto', 'River Plate'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Charles Aránguiz', nat: 'Chile', cl: ['Bayer Leverkusen'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Eduardo Vargas', nat: 'Chile', cl: ['Napoli', 'Valencia', 'Hoffenheim'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Cristian Rodríguez', nat: 'Uruguay', cl: ['Porto', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Martín Cáceres', nat: 'Uruguay', cl: ['Barcelona', 'Juventus', 'Lazio'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Maxi Pereira', nat: 'Uruguay', cl: ['Benfica', 'Porto'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Enner Valencia', nat: 'Ecuador', cl: ['West Ham', 'Fenerbahçe'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Pervis Estupiñán', nat: 'Ecuador', cl: ['Villarreal', 'Brighton', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Paolo Guerrero', nat: 'Perú', cl: ['Bayern Munich', 'Hamburgo'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Jefferson Farfán', nat: 'Perú', cl: ['PSV', 'Schalke 04'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // África
    { n: 'Obafemi Martins', nat: 'Nigeria', cl: ['Inter', 'Newcastle'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Victor Moses', nat: 'Nigeria', cl: ['Chelsea', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Kevin-Prince Boateng', nat: 'Ghana', cl: ['AC Milan', 'Schalke 04', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Papa Bouba Diop', nat: 'Senegal', cl: ['Fulham', 'Portsmouth'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Demba Ba', nat: 'Senegal', cl: ['Newcastle', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Ismaïla Sarr', nat: 'Senegal', cl: ['Watford', 'Marseille', 'Crystal Palace'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Didier Zokora', nat: 'Costa de Marfil', cl: ['Saint-Étienne', 'Tottenham', 'Sevilla'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Rigobert Song', nat: 'Camerún', cl: ['Liverpool', 'West Ham', 'Galatasaray'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Nicolas Nkoulou', nat: 'Camerún', cl: ['Marseille', 'Lyon', 'Torino'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Medhi Benatia', nat: 'Marruecos', cl: ['Udinese', 'Roma', 'Bayern Munich', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Sofiane Feghouli', nat: 'Argelia', cl: ['Valencia', 'West Ham', 'Galatasaray'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Yacine Brahimi', nat: 'Argelia', cl: ['Granada', 'Porto'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },

    // === Lote 2026: estrellas actuales y traspasos recientes (datos verificados) ===
    // --- Inglaterra ---
    { n: 'Jude Bellingham', nat: 'Inglaterra', cl: ['Birmingham', 'Borussia Dortmund', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Bukayo Saka', nat: 'Inglaterra', cl: ['Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Phil Foden', nat: 'Inglaterra', cl: ['Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Cole Palmer', nat: 'Inglaterra', cl: ['Manchester City', 'Chelsea'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Declan Rice', nat: 'Inglaterra', cl: ['West Ham', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Marcus Rashford', nat: 'Inglaterra', cl: ['Manchester United', 'Aston Villa', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Trent Alexander-Arnold', nat: 'Inglaterra', cl: ['Liverpool', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Kobbie Mainoo', nat: 'Inglaterra', cl: ['Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Ollie Watkins', nat: 'Inglaterra', cl: ['Brentford', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Ivan Toney', nat: 'Inglaterra', cl: ['Newcastle', 'Brentford', 'Al-Ahli'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Eberechi Eze', nat: 'Inglaterra', cl: ['QPR', 'Crystal Palace', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Marc Guéhi', nat: 'Inglaterra', cl: ['Chelsea', 'Crystal Palace'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Jonny Evans', nat: 'Irlanda del Norte', cl: ['Manchester United', 'West Bromwich Albion', 'Leicester'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // --- Francia ---
    { n: 'Ousmane Dembélé', nat: 'Francia', cl: ['Rennes', 'Borussia Dortmund', 'Barcelona', 'PSG'], wc: 1, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Aurélien Tchouaméni', nat: 'Francia', cl: ['Monaco', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Eduardo Camavinga', nat: 'Francia', cl: ['Rennes', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Randal Kolo Muani', nat: 'Francia', cl: ['Nantes', 'Eintracht Frankfurt', 'PSG', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Bradley Barcola', nat: 'Francia', cl: ['Lyon', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Michael Olise', nat: 'Francia', cl: ['Reading', 'Crystal Palace', 'Bayern Munich'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Khéphren Thuram', nat: 'Francia', cl: ['Nice', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Leny Yoro', nat: 'Francia', cl: ['Lille', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Wesley Fofana', nat: 'Francia', cl: ['Saint-Étienne', 'Leicester', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Jean-Clair Todibo', nat: 'Francia', cl: ['Barcelona', 'Nice', 'West Ham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // --- España ---
    { n: 'Pedri', nat: 'España', cl: ['Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Gavi', nat: 'España', cl: ['Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Lamine Yamal', nat: 'España', cl: ['Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Nico Williams', nat: 'España', cl: ['Athletic'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Mikel Merino', nat: 'España', cl: ['Borussia Dortmund', 'Real Sociedad', 'Newcastle', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Martín Zubimendi', nat: 'España', cl: ['Real Sociedad', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Álvaro Morata', nat: 'España', cl: ['Real Madrid', 'Juventus', 'Chelsea', 'Atlético Madrid', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Ferran Torres', nat: 'España', cl: ['Valencia', 'Manchester City', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Mikel Oyarzabal', nat: 'España', cl: ['Real Sociedad'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Marc Cucurella', nat: 'España', cl: ['Getafe', 'Brighton', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Robin Le Normand', nat: 'España', cl: ['Real Sociedad', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Unai Simón', nat: 'España', cl: ['Athletic'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'David Raya', nat: 'España', cl: ['Blackburn', 'Brentford', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Nolito', nat: 'España', cl: ['Benfica', 'Celta', 'Manchester City', 'Sevilla'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Denis Suárez', nat: 'España', cl: ['Manchester City', 'Barcelona', 'Celta', 'Villarreal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Pau López', nat: 'España', cl: ['Espanyol', 'Betis', 'Roma', 'Marseille'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    // --- Portugal ---
    { n: 'Rafael Leão', nat: 'Portugal', cl: ['Sporting', 'Lille', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Vitinha', nat: 'Portugal', cl: ['Porto', 'Wolves', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Nuno Mendes', nat: 'Portugal', cl: ['Sporting', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Gonçalo Ramos', nat: 'Portugal', cl: ['Benfica', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Rúben Neves', nat: 'Portugal', cl: ['Porto', 'Wolves', 'Al-Hilal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Matheus Nunes', nat: 'Portugal', cl: ['Sporting', 'Wolves', 'Manchester City'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Pedro Neto', nat: 'Portugal', cl: ['Lazio', 'Wolves', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // --- Brasil ---
    { n: 'Gabriel Jesus', nat: 'Brasil', cl: ['Palmeiras', 'Manchester City', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Bruno Guimarães', nat: 'Brasil', cl: ['Athletico Paranaense', 'Lyon', 'Newcastle'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Antony', nat: 'Brasil', cl: ['São Paulo', 'Ajax', 'Manchester United', 'Betis'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Gabriel Magalhães', nat: 'Brasil', cl: ['Lille', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Raphinha', nat: 'Brasil', cl: ['Rennes', 'Leeds', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Éder Militão', nat: 'Brasil', cl: ['São Paulo', 'Porto', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Estêvão', nat: 'Brasil', cl: ['Palmeiras', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Gabigol', nat: 'Brasil', cl: ['Santos', 'Inter', 'Flamengo'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Fred', nat: 'Brasil', cl: ['Shakhtar', 'Manchester United', 'Fenerbahçe'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // --- Italia ---
    { n: 'Federico Chiesa', nat: 'Italia', cl: ['Fiorentina', 'Juventus', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Nicolò Barella', nat: 'Italia', cl: ['Cagliari', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Sandro Tonali', nat: 'Italia', cl: ['Brescia', 'AC Milan', 'Newcastle'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Gianluigi Donnarumma', nat: 'Italia', cl: ['AC Milan', 'PSG', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Riccardo Calafiori', nat: 'Italia', cl: ['Roma', 'Bologna', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Mario Balotelli', nat: 'Italia', cl: ['Inter', 'Manchester City', 'AC Milan', 'Liverpool', 'Nice', 'Marseille'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // --- Alemania ---
    { n: 'Florian Wirtz', nat: 'Alemania', cl: ['Bayer Leverkusen', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Jamal Musiala', nat: 'Alemania', cl: ['Bayern Munich'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // --- Países Bajos ---
    { n: 'Frenkie de Jong', nat: 'Países Bajos', cl: ['Ajax', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Matthijs de Ligt', nat: 'Países Bajos', cl: ['Ajax', 'Juventus', 'Bayern Munich', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Cody Gakpo', nat: 'Países Bajos', cl: ['PSV', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Ryan Gravenberch', nat: 'Países Bajos', cl: ['Ajax', 'Bayern Munich', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Jurriën Timber', nat: 'Países Bajos', cl: ['Ajax', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Denzel Dumfries', nat: 'Países Bajos', cl: ['PSV', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Xavi Simons', nat: 'Países Bajos', cl: ['PSV', 'RB Leipzig', 'PSG', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Teun Koopmeiners', nat: 'Países Bajos', cl: ['AZ', 'Atalanta', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Jeremie Frimpong', nat: 'Países Bajos', cl: ['Celtic', 'Bayer Leverkusen', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Wout Weghorst', nat: 'Países Bajos', cl: ['Wolfsburg', 'Burnley', 'Manchester United', 'Hoffenheim', 'Ajax'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // --- Escandinavia / Norte ---
    { n: 'Alexander Isak', nat: 'Suecia', cl: ['Real Sociedad', 'Newcastle', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Martin Ødegaard', nat: 'Noruega', cl: ['Real Madrid', 'Real Sociedad', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Rasmus Højlund', nat: 'Dinamarca', cl: ['Atalanta', 'Manchester United', 'Napoli'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Teemu Pukki', nat: 'Finlandia', cl: ['Schalke 04', 'Celtic', 'Brøndby', 'Norwich'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Glen Kamara', nat: 'Finlandia', cl: ['Dundee', 'Rangers', 'Leeds'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // --- Serbia / Balcanes ---
    { n: 'Dušan Vlahović', nat: 'Serbia', cl: ['Fiorentina', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Sergej Milinković-Savić', nat: 'Serbia', cl: ['Genk', 'Lazio', 'Al-Hilal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Aleksandar Mitrović', nat: 'Serbia', cl: ['Newcastle', 'Fulham', 'Al-Hilal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Dušan Tadić', nat: 'Serbia', cl: ['Twente', 'Southampton', 'Ajax', 'Fenerbahçe'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // --- Georgia / Eslovenia ---
    { n: 'Khvicha Kvaratskhelia', nat: 'Georgia', cl: ['Napoli', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Benjamin Šeško', nat: 'Eslovenia', cl: ['Salzburgo', 'RB Leipzig', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // --- Uruguay ---
    { n: 'Federico Valverde', nat: 'Uruguay', cl: ['Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Darwin Núñez', nat: 'Uruguay', cl: ['Benfica', 'Liverpool', 'Al-Hilal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Ronald Araújo', nat: 'Uruguay', cl: ['Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // --- África ---
    { n: 'Victor Osimhen', nat: 'Nigeria', cl: ['Lille', 'Napoli', 'Galatasaray'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Ademola Lookman', nat: 'Nigeria', cl: ['Everton', 'RB Leipzig', 'Atalanta'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Achraf Hakimi', nat: 'Marruecos', cl: ['Real Madrid', 'Borussia Dortmund', 'Inter', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Youssef En-Nesyri', nat: 'Marruecos', cl: ['Málaga', 'Leganés', 'Sevilla', 'Fenerbahçe'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Noussair Mazraoui', nat: 'Marruecos', cl: ['Ajax', 'Bayern Munich', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Sofyan Amrabat', nat: 'Marruecos', cl: ['Club Brugge', 'Fiorentina', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Mohammed Kudus', nat: 'Ghana', cl: ['Ajax', 'West Ham', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Naby Keïta', nat: 'Guinea', cl: ['Salzburgo', 'RB Leipzig', 'Liverpool', 'Werder Bremen'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Yves Bissouma', nat: 'Malí', cl: ['Lille', 'Brighton', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // --- Asia ---
    { n: 'Kaoru Mitoma', nat: 'Japón', cl: ['Kawasaki Frontale', 'Brighton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Takefusa Kubo', nat: 'Japón', cl: ['Real Madrid', 'Getafe', 'Real Sociedad'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Wataru Endō', nat: 'Japón', cl: ['Stuttgart', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Kim Min-jae', nat: 'Corea del Sur', cl: ['Fenerbahçe', 'Napoli', 'Bayern Munich'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Hwang Hee-chan', nat: 'Corea del Sur', cl: ['Salzburgo', 'RB Leipzig', 'Wolves'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Sardar Azmoun', nat: 'Irán', cl: ['Zenit', 'Bayer Leverkusen', 'Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // --- América ---
    { n: 'Christian Pulisic', nat: 'Estados Unidos', cl: ['Borussia Dortmund', 'Chelsea', 'AC Milan'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Keylor Navas', nat: 'Costa Rica', cl: ['Levante', 'Real Madrid', 'PSG', 'Nottingham Forest'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Bryan Ruiz', nat: 'Costa Rica', cl: ['Twente', 'Fulham', 'Sporting'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Jonathan David', nat: 'Canadá', cl: ['Gante', 'Lille', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Alphonso Davies', nat: 'Canadá', cl: ['Vancouver Whitecaps', 'Bayern Munich'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Alfredo Morelos', nat: 'Colombia', cl: ['Rangers', 'Santos'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Luis Díaz', nat: 'Colombia', cl: ['Porto', 'Liverpool', 'Bayern Munich'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Salomón Rondón', nat: 'Venezuela', cl: ['Málaga', 'Newcastle', 'Everton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Miguel Almirón', nat: 'Paraguay', cl: ['Atlanta United', 'Newcastle'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },

    // --- Refuerzo de nacionalidades poco pobladas (jugadores reales verificados) ---
    { n: 'Georges Mikautadze', nat: 'Georgia', cl: ['Metz', 'Ajax', 'Lyon'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Guram Kashia', nat: 'Georgia', cl: ['Vitesse', 'AEK Atenas'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Mehdi Taremi', nat: 'Irán', cl: ['Porto', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Alireza Jahanbakhsh', nat: 'Irán', cl: ['AZ', 'Brighton', 'Feyenoord'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Cyle Larin', nat: 'Canadá', cl: ['Beşiktaş', 'Real Valladolid', 'Mallorca'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Atiba Hutchinson', nat: 'Canadá', cl: ['PSV', 'Beşiktaş'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Joel Campbell', nat: 'Costa Rica', cl: ['Arsenal', 'Villarreal', 'Betis'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Celso Borges', nat: 'Costa Rica', cl: ['Deportivo', 'AIK'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Jari Litmanen', nat: 'Finlandia', cl: ['Ajax', 'Barcelona', 'Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Sami Hyypiä', nat: 'Finlandia', cl: ['Liverpool', 'Bayer Leverkusen'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'George Best', nat: 'Irlanda del Norte', cl: ['Manchester United'], wc: 0, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Willi Orbán', nat: 'Hungría', cl: ['RB Leipzig'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Roland Sallai', nat: 'Hungría', cl: ['Freiburg', 'Galatasaray'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Péter Gulácsi', nat: 'Hungría', cl: ['RB Leipzig', 'Salzburgo'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Tomás Rincón', nat: 'Venezuela', cl: ['Hamburgo', 'Genoa', 'Juventus', 'Torino'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Yangel Herrera', nat: 'Venezuela', cl: ['Manchester City', 'Girona'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Roque Santa Cruz', nat: 'Paraguay', cl: ['Bayern Munich', 'Blackburn', 'Manchester City', 'Málaga'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Óscar Cardozo', nat: 'Paraguay', cl: ['Benfica'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Frédéric Kanouté', nat: 'Malí', cl: ['Lyon', 'West Ham', 'Tottenham', 'Sevilla'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Amadou Haidara', nat: 'Malí', cl: ['Salzburgo', 'RB Leipzig'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Serhou Guirassy', nat: 'Guinea', cl: ['Stuttgart', 'Borussia Dortmund', 'Rennes'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Ibrahima Traoré', nat: 'Guinea', cl: ['Stuttgart', 'Borussia Mönchengladbach'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Sargis Adamyan', nat: 'Armenia', cl: ['Hoffenheim', 'Club Brugge'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Christopher Wreh', nat: 'Liberia', cl: ['Monaco', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },

    // ================= LOTE MASIVO por club (datos reales verificados) =================
    // Muchas fichas comparten nombre con jugadores ya existentes: el deduplicador
    // FUSIONA sus clubes, completando historiales incompletos (arregla el bug de
    // "jugó en dos equipos y la app decía que no").
    // --- Premier: Brighton ---
    { n: 'Pascal Groß', nat: 'Alemania', cl: ['Ingolstadt', 'Brighton', 'Borussia Dortmund'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Lewis Dunk', nat: 'Inglaterra', cl: ['Brighton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Danny Welbeck', nat: 'Inglaterra', cl: ['Manchester United', 'Arsenal', 'Brighton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Adam Lallana', nat: 'Inglaterra', cl: ['Southampton', 'Liverpool', 'Brighton'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Moisés Caicedo', nat: 'Ecuador', cl: ['Independiente del Valle', 'Brighton', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Robert Sánchez', nat: 'España', cl: ['Brighton', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    // --- Premier: Brentford / Bournemouth / Southampton / Leeds / Burnley ---
    { n: 'Bryan Mbeumo', nat: 'Camerún', cl: ['Troyes', 'Brentford', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Yoane Wissa', nat: 'RD Congo', cl: ['Lorient', 'Brentford'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Christian Nørgaard', nat: 'Dinamarca', cl: ['Fiorentina', 'Brentford', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Dominic Solanke', nat: 'Inglaterra', cl: ['Chelsea', 'Liverpool', 'Bournemouth', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'James Ward-Prowse', nat: 'Inglaterra', cl: ['Southampton', 'West Ham', 'Nottingham Forest'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Pierre-Emile Højbjerg', nat: 'Dinamarca', cl: ['Bayern Munich', 'Southampton', 'Tottenham', 'Marseille'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Kalvin Phillips', nat: 'Inglaterra', cl: ['Leeds', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Patrick Bamford', nat: 'Inglaterra', cl: ['Chelsea', 'Middlesbrough', 'Leeds'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Chris Wood', nat: 'Nueva Zelanda', cl: ['Leeds', 'Burnley', 'Newcastle', 'Nottingham Forest'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Nick Pope', nat: 'Inglaterra', cl: ['Burnley', 'Newcastle'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    // --- Premier: Everton / Newcastle / West Ham / Palace / Wolves / Fulham / Forest ---
    { n: 'Jordan Pickford', nat: 'Inglaterra', cl: ['Sunderland', 'Everton'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Dominic Calvert-Lewin', nat: 'Inglaterra', cl: ['Sheffield United', 'Everton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Idrissa Gueye', nat: 'Senegal', cl: ['Lille', 'Aston Villa', 'Everton', 'PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Richarlison', nat: 'Brasil', cl: ['Watford', 'Everton', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Yerry Mina', nat: 'Colombia', cl: ['Barcelona', 'Everton', 'Fiorentina'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Kieran Trippier', nat: 'Inglaterra', cl: ['Tottenham', 'Atlético Madrid', 'Newcastle'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Callum Wilson', nat: 'Inglaterra', cl: ['Bournemouth', 'Newcastle'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Michail Antonio', nat: 'Jamaica', cl: ['Nottingham Forest', 'West Ham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Jarrod Bowen', nat: 'Inglaterra', cl: ['Hull', 'West Ham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Łukasz Fabiański', nat: 'Polonia', cl: ['Arsenal', 'Swansea', 'West Ham'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Kurt Zouma', nat: 'Francia', cl: ['Saint-Étienne', 'Chelsea', 'West Ham'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Tomáš Souček', nat: 'República Checa', cl: ['Slavia Praga', 'West Ham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Wilfried Zaha', nat: 'Costa de Marfil', cl: ['Manchester United', 'Crystal Palace', 'Galatasaray'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Jean-Philippe Mateta', nat: 'Francia', cl: ['Mainz', 'Crystal Palace'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Raúl Jiménez', nat: 'México', cl: ['América', 'Atlético Madrid', 'Benfica', 'Wolves', 'Fulham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'João Moutinho', nat: 'Portugal', cl: ['Sporting', 'Porto', 'Monaco', 'Wolves'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'João Palhinha', nat: 'Portugal', cl: ['Sporting', 'Braga', 'Fulham', 'Bayern Munich', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Bernd Leno', nat: 'Alemania', cl: ['Bayer Leverkusen', 'Arsenal', 'Fulham'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Morgan Gibbs-White', nat: 'Inglaterra', cl: ['Wolves', 'Nottingham Forest'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Taiwo Awoniyi', nat: 'Nigeria', cl: ['Liverpool', 'Union Berlin', 'Nottingham Forest'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Murillo', nat: 'Brasil', cl: ['Corinthians', 'Nottingham Forest'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    // --- Serie A: Atalanta / Fiorentina / Lazio / Roma / Napoli / Torino / Cagliari / Bologna ---
    { n: 'Duván Zapata', nat: 'Colombia', cl: ['Napoli', 'Sampdoria', 'Atalanta', 'Torino'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Papu Gómez', nat: 'Argentina', cl: ['Catania', 'Atalanta', 'Sevilla'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Josip Iličić', nat: 'Eslovenia', cl: ['Palermo', 'Fiorentina', 'Atalanta'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Mario Pašalić', nat: 'Croacia', cl: ['Chelsea', 'AC Milan', 'Atalanta'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Nikola Milenković', nat: 'Serbia', cl: ['Fiorentina', 'Nottingham Forest'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Ciro Immobile', nat: 'Italia', cl: ['Borussia Dortmund', 'Sevilla', 'Lazio', 'Beşiktaş'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Felipe Anderson', nat: 'Brasil', cl: ['Santos', 'Lazio', 'West Ham', 'Palmeiras'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Luis Alberto', nat: 'España', cl: ['Liverpool', 'Lazio'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Paulo Dybala', nat: 'Argentina', cl: ['Palermo', 'Juventus', 'Roma'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Lorenzo Pellegrini', nat: 'Italia', cl: ['Sassuolo', 'Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Tammy Abraham', nat: 'Inglaterra', cl: ['Chelsea', 'Roma', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Chris Smalling', nat: 'Inglaterra', cl: ['Manchester United', 'Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Dries Mertens', nat: 'Bélgica', cl: ['PSV', 'Napoli', 'Galatasaray'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Lorenzo Insigne', nat: 'Italia', cl: ['Napoli', 'Toronto'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Kalidou Koulibaly', nat: 'Senegal', cl: ['Genk', 'Napoli', 'Chelsea', 'Al-Hilal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Piotr Zieliński', nat: 'Polonia', cl: ['Udinese', 'Napoli', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Fabián Ruiz', nat: 'España', cl: ['Betis', 'Napoli', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Scott McTominay', nat: 'Escocia', cl: ['Manchester United', 'Napoli'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Andrea Belotti', nat: 'Italia', cl: ['Palermo', 'Torino', 'Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Radja Nainggolan', nat: 'Bélgica', cl: ['Cagliari', 'Roma', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Giovanni Simeone', nat: 'Argentina', cl: ['Genoa', 'Fiorentina', 'Verona', 'Napoli'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Joshua Zirkzee', nat: 'Países Bajos', cl: ['Bayern Munich', 'Bologna', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Lewis Ferguson', nat: 'Escocia', cl: ['Aberdeen', 'Bologna'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // --- Bundesliga: Leverkusen / Leipzig / Frankfurt / Gladbach / Wolfsburg / Freiburg ---
    { n: 'Granit Xhaka', nat: 'Suiza', cl: ['Basilea', 'Borussia Mönchengladbach', 'Arsenal', 'Bayer Leverkusen'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Victor Boniface', nat: 'Nigeria', cl: ['Union Saint-Gilloise', 'Bayer Leverkusen'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Jonathan Tah', nat: 'Alemania', cl: ['Hamburgo', 'Bayer Leverkusen', 'Bayern Munich'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Álex Grimaldo', nat: 'España', cl: ['Barcelona', 'Benfica', 'Bayer Leverkusen'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Timo Werner', nat: 'Alemania', cl: ['Stuttgart', 'RB Leipzig', 'Chelsea', 'Tottenham'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Dani Olmo', nat: 'España', cl: ['RB Leipzig', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Christopher Nkunku', nat: 'Francia', cl: ['PSG', 'RB Leipzig', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Emil Forsberg', nat: 'Suecia', cl: ['Malmö', 'RB Leipzig', 'New York Red Bulls'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Filip Kostić', nat: 'Serbia', cl: ['Hamburgo', 'Eintracht Frankfurt', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Sébastien Haller', nat: 'Costa de Marfil', cl: ['Utrecht', 'West Ham', 'Ajax', 'Borussia Dortmund'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Omar Marmoush', nat: 'Egipto', cl: ['Wolfsburg', 'Eintracht Frankfurt', 'Manchester City'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Marcus Thuram', nat: 'Francia', cl: ['Guingamp', 'Borussia Mönchengladbach', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Yann Sommer', nat: 'Suiza', cl: ['Basilea', 'Borussia Mönchengladbach', 'Bayern Munich', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Ivan Perišić', nat: 'Croacia', cl: ['Borussia Dortmund', 'Wolfsburg', 'Inter', 'Bayern Munich', 'Tottenham'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Andrej Kramarić', nat: 'Croacia', cl: ['Leicester', 'Hoffenheim'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Rafael van der Vaart', nat: 'Países Bajos', cl: ['Ajax', 'Hamburgo', 'Real Madrid', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // --- Ligue 1: Lille / Nice / Lens / Saint-Étienne / Montpellier ---
    { n: 'Renato Sanches', nat: 'Portugal', cl: ['Benfica', 'Bayern Munich', 'Lille', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Nicolas Pépé', nat: 'Costa de Marfil', cl: ['Angers', 'Lille', 'Arsenal', 'Trabzonspor'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Kasper Schmeichel', nat: 'Dinamarca', cl: ['Leicester', 'Nice', 'Celtic'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Seko Fofana', nat: 'Costa de Marfil', cl: ['Udinese', 'Lens', 'Al-Nassr'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Loïs Openda', nat: 'Bélgica', cl: ['Club Brugge', 'Lens', 'RB Leipzig'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Pierre-Emerick Aubameyang', nat: 'Gabón', cl: ['Saint-Étienne', 'Borussia Dortmund', 'Arsenal', 'Barcelona', 'Marseille', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Olivier Giroud', nat: 'Francia', cl: ['Montpellier', 'Arsenal', 'Chelsea', 'AC Milan', 'LA Galaxy'], wc: 1, ucl: 1, bdo: 0, pos: 'DEL' },
    // --- Eredivisie: Feyenoord / PSV / Ajax ---
    { n: 'Robin van Persie', nat: 'Países Bajos', cl: ['Feyenoord', 'Arsenal', 'Manchester United', 'Fenerbahçe'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Santiago Giménez', nat: 'México', cl: ['Cruz Azul', 'Feyenoord', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Dirk Kuyt', nat: 'Países Bajos', cl: ['Utrecht', 'Feyenoord', 'Liverpool', 'Fenerbahçe'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Memphis Depay', nat: 'Países Bajos', cl: ['PSV', 'Manchester United', 'Lyon', 'Barcelona', 'Atlético Madrid', 'Corinthians'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Hirving Lozano', nat: 'México', cl: ['Pachuca', 'PSV', 'Napoli', 'San Diego'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Ruud van Nistelrooy', nat: 'Países Bajos', cl: ['PSV', 'Manchester United', 'Real Madrid', 'Hamburgo'], wc: 0, ucl: 0, bdo: 1, pos: 'DEL' },
    { n: 'Hakim Ziyech', nat: 'Marruecos', cl: ['Twente', 'Ajax', 'Chelsea', 'Galatasaray'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Daley Blind', nat: 'Países Bajos', cl: ['Ajax', 'Manchester United', 'Bayern Munich'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'André Onana', nat: 'Camerún', cl: ['Ajax', 'Inter', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Lisandro Martínez', nat: 'Argentina', cl: ['Defensa y Justicia', 'Ajax', 'Manchester United'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Nicolás Tagliafico', nat: 'Argentina', cl: ['Independiente', 'Ajax', 'Lyon'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'David Neres', nat: 'Brasil', cl: ['São Paulo', 'Ajax', 'Benfica', 'Napoli'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    // --- Portugal: Sporting / Porto / Benfica ---
    { n: 'Viktor Gyökeres', nat: 'Suecia', cl: ['Brighton', 'Coventry', 'Sporting', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Manuel Ugarte', nat: 'Uruguay', cl: ['Talleres', 'Sporting', 'PSG', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Nicolás Otamendi', nat: 'Argentina', cl: ['Vélez', 'Valencia', 'Manchester City', 'Benfica'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    // --- Saudi Pro League ---
    { n: 'Aymeric Laporte', nat: 'España', cl: ['Athletic', 'Manchester City', 'Al-Nassr'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Marcelo Brozović', nat: 'Croacia', cl: ['Dinamo Zagreb', 'Inter', 'Al-Nassr'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Yassine Bounou', nat: 'Marruecos', cl: ['Girona', 'Sevilla', 'Al-Hilal'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Fabinho', nat: 'Brasil', cl: ['Monaco', 'Liverpool', 'Al-Ittihad'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Riyad Mahrez', nat: 'Argelia', cl: ['Leicester', 'Manchester City', 'Al-Ahli'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Roberto Firmino', nat: 'Brasil', cl: ['Hoffenheim', 'Liverpool', 'Al-Ahli'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Édouard Mendy', nat: 'Senegal', cl: ['Reims', 'Rennes', 'Chelsea', 'Al-Ahli'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    // --- Brasileirão ---
    { n: 'Douglas Costa', nat: 'Brasil', cl: ['Grêmio', 'Shakhtar', 'Bayern Munich', 'Juventus'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Alexandre Pato', nat: 'Brasil', cl: ['Internacional', 'AC Milan', 'Corinthians', 'São Paulo'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Germán Cano', nat: 'Argentina', cl: ['Independiente Medellín', 'Fluminense'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Filipe Luís', nat: 'Brasil', cl: ['Deportivo', 'Atlético Madrid', 'Chelsea', 'Flamengo'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'De Arrascaeta', nat: 'Uruguay', cl: ['Defensor', 'Cruzeiro', 'Flamengo'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'David Luiz', nat: 'Brasil', cl: ['Benfica', 'Chelsea', 'PSG', 'Arsenal', 'Flamengo'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Oscar', nat: 'Brasil', cl: ['São Paulo', 'Chelsea', 'Shanghai Port'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    // --- Argentina (Boca / River / Independiente) ---
    { n: 'Gonzalo Higuaín', nat: 'Argentina', cl: ['River Plate', 'Real Madrid', 'Napoli', 'Juventus', 'AC Milan', 'Inter Miami'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Marcos Rojo', nat: 'Argentina', cl: ['Sporting', 'Manchester United', 'Boca Juniors'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Edinson Cavani', nat: 'Uruguay', cl: ['Palermo', 'Napoli', 'PSG', 'Manchester United', 'Valencia', 'Boca Juniors'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Diego Forlán', nat: 'Uruguay', cl: ['Independiente', 'Manchester United', 'Villarreal', 'Atlético Madrid', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Diego Milito', nat: 'Argentina', cl: ['Racing', 'Genoa', 'Zaragoza', 'Inter'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    // --- Turquía / Rusia ---
    { n: 'Wesley Sneijder', nat: 'Países Bajos', cl: ['Ajax', 'Real Madrid', 'Inter', 'Galatasaray'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Didier Drogba', nat: 'Costa de Marfil', cl: ['Marseille', 'Chelsea', 'Galatasaray'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Mauro Icardi', nat: 'Argentina', cl: ['Sampdoria', 'Inter', 'PSG', 'Galatasaray'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Edin Džeko', nat: 'Bosnia', cl: ['Wolfsburg', 'Manchester City', 'Roma', 'Inter', 'Fenerbahçe'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Demba Ba', nat: 'Senegal', cl: ['West Ham', 'Newcastle', 'Chelsea', 'Beşiktaş'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Marek Hamšík', nat: 'Eslovaquia', cl: ['Brescia', 'Napoli', 'Trabzonspor'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Hulk', nat: 'Brasil', cl: ['Porto', 'Zenit', 'Atlético Mineiro'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Axel Witsel', nat: 'Bélgica', cl: ['Standard Lieja', 'Benfica', 'Zenit', 'Borussia Dortmund', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Malcom', nat: 'Brasil', cl: ['Bordeaux', 'Barcelona', 'Zenit', 'Al-Hilal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Quincy Promes', nat: 'Países Bajos', cl: ['Spartak', 'Sevilla', 'Ajax'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Seydou Doumbia', nat: 'Costa de Marfil', cl: ['CSKA Moscú', 'Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },

    // --- Lote verificado (era actual, sólo jugadores NO presentes ya) ---
    { n: 'Anthony Elanga', nat: 'Suecia', cl: ['Manchester United', 'Nottingham Forest', 'Newcastle'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Amad Diallo', nat: 'Costa de Marfil', cl: ['Atalanta', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Leon Bailey', nat: 'Jamaica', cl: ['Genk', 'Bayer Leverkusen', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Cristian Romero', nat: 'Argentina', cl: ['Genoa', 'Atalanta', 'Tottenham'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Guglielmo Vicario', nat: 'Italia', cl: ['Cagliari', 'Empoli', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Pape Matar Sarr', nat: 'Senegal', cl: ['Metz', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Brennan Johnson', nat: 'Gales', cl: ['Nottingham Forest', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Pedro Porro', nat: 'España', cl: ['Manchester City', 'Sporting', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Nicolas Jackson', nat: 'Senegal', cl: ['Villarreal', 'Chelsea', 'Bayern Munich'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Harvey Elliott', nat: 'Inglaterra', cl: ['Fulham', 'Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Curtis Jones', nat: 'Inglaterra', cl: ['Liverpool'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Jadon Sancho', nat: 'Inglaterra', cl: ['Manchester City', 'Borussia Dortmund', 'Manchester United', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Giuliano Simeone', nat: 'Argentina', cl: ['Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Samuel Lino', nat: 'Brasil', cl: ['Atlético Madrid', 'Flamengo'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Iñaki Williams', nat: 'Ghana', cl: ['Athletic'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Oihan Sancet', nat: 'España', cl: ['Athletic'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Brais Méndez', nat: 'España', cl: ['Celta', 'Real Sociedad'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Artem Dovbyk', nat: 'Ucrania', cl: ['Dnipro', 'Girona', 'Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Viktor Tsygankov', nat: 'Ucrania', cl: ['Dinamo Kyiv', 'Girona'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Sávio', nat: 'Brasil', cl: ['PSV', 'Girona', 'Manchester City'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Dodi Lukebakio', nat: 'Bélgica', cl: ['Watford', 'Hertha', 'Sevilla'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Gleison Bremer', nat: 'Brasil', cl: ['Torino', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Timothy Weah', nat: 'Estados Unidos', cl: ['PSG', 'Lille', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Andrea Cambiaso', nat: 'Italia', cl: ['Genoa', 'Bologna', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Destiny Udogie', nat: 'Italia', cl: ['Udinese', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Niclas Füllkrug', nat: 'Alemania', cl: ['Werder Bremen', 'Borussia Dortmund', 'West Ham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Gregor Kobel', nat: 'Suiza', cl: ['Stuttgart', 'Borussia Dortmund'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Ritsu Dōan', nat: 'Japón', cl: ['PSV', 'Freiburg'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Strahinja Pavlović', nat: 'Serbia', cl: ['Salzburgo', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Folarin Balogun', nat: 'Estados Unidos', cl: ['Arsenal', 'Monaco'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Antonee Robinson', nat: 'Estados Unidos', cl: ['Wigan', 'Fulham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Samuel Chukwueze', nat: 'Nigeria', cl: ['Villarreal', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Nayef Aguerd', nat: 'Marruecos', cl: ['Rennes', 'West Ham', 'Real Sociedad'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Amine Harit', nat: 'Marruecos', cl: ['Schalke 04', 'Marseille'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Willian Pacho', nat: 'Ecuador', cl: ['Royal Antwerp', 'Eintracht Frankfurt', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },

    // --- Ronda 2: reconocibles + equipos de media tabla (estilo Crystal Palace) ---
    { n: 'Bojan Krkić', nat: 'España', cl: ['Barcelona', 'Roma', 'AC Milan', 'Ajax', 'Stoke'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Gerard Deulofeu', nat: 'España', cl: ['Barcelona', 'Everton', 'AC Milan', 'Watford', 'Udinese'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Troy Deeney', nat: 'Inglaterra', cl: ['Watford', 'Birmingham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Lukas Podolski', nat: 'Alemania', cl: ['Köln', 'Bayern Munich', 'Arsenal', 'Inter', 'Galatasaray'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Anthony Modeste', nat: 'Francia', cl: ['Bordeaux', 'Köln', 'Borussia Dortmund'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Divock Origi', nat: 'Bélgica', cl: ['Lille', 'Liverpool', 'AC Milan'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Christian Benteke', nat: 'Bélgica', cl: ['Genk', 'Aston Villa', 'Liverpool', 'Crystal Palace'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Loïc Rémy', nat: 'Francia', cl: ['Marseille', 'QPR', 'Newcastle', 'Chelsea', 'Crystal Palace'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Cheikhou Kouyaté', nat: 'Senegal', cl: ['Anderlecht', 'West Ham', 'Crystal Palace', 'Nottingham Forest'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Odsonne Édouard', nat: 'Francia', cl: ['PSG', 'Celtic', 'Crystal Palace'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Emmanuel Adebayor', nat: 'Togo', cl: ['Monaco', 'Arsenal', 'Manchester City', 'Real Madrid', 'Tottenham', 'Crystal Palace'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Andros Townsend', nat: 'Inglaterra', cl: ['Tottenham', 'Newcastle', 'Crystal Palace', 'Everton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Vicente Guaita', nat: 'España', cl: ['Valencia', 'Getafe', 'Crystal Palace'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Papiss Cissé', nat: 'Senegal', cl: ['Freiburg', 'Newcastle'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Nikola Kalinić', nat: 'Croacia', cl: ['Blackburn', 'Fiorentina', 'AC Milan', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Scott McKenna', nat: 'Escocia', cl: ['Aberdeen', 'Nottingham Forest'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Matt Miazga', nat: 'Estados Unidos', cl: ['New York Red Bulls', 'Chelsea', 'Vitesse'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Habib Diallo', nat: 'Senegal', cl: ['Metz', 'Strasbourg', 'Al-Shabab'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Peter Odemwingie', nat: 'Nigeria', cl: ['Lille', 'Lokomotiv Moscú', 'West Bromwich Albion', 'Stoke'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },

    // --- Ronda 3: media tabla de las 5 grandes ligas, porteros y Sudamérica ---
    { n: 'Jérémy Toulalan', nat: 'Francia', cl: ['Nantes', 'Lyon', 'Málaga', 'Monaco'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Martín Demichelis', nat: 'Argentina', cl: ['River Plate', 'Bayern Munich', 'Málaga', 'Manchester City'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Júlio Baptista', nat: 'Brasil', cl: ['Sevilla', 'Real Madrid', 'Arsenal', 'Roma', 'Málaga'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Cani', nat: 'España', cl: ['Zaragoza', 'Villarreal'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Roberto Soldado', nat: 'España', cl: ['Real Madrid', 'Getafe', 'Valencia', 'Tottenham', 'Villarreal', 'Fenerbahçe', 'Granada', 'Levante'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Michu', nat: 'España', cl: ['Rayo Vallecano', 'Swansea', 'Napoli'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'José Callejón', nat: 'España', cl: ['Espanyol', 'Real Madrid', 'Napoli', 'Fiorentina', 'Granada'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Iván Helguera', nat: 'España', cl: ['Roma', 'Espanyol', 'Real Madrid', 'Valencia'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Santiago Cañizares', nat: 'España', cl: ['Celta', 'Real Madrid', 'Valencia'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Vicente Rodríguez', nat: 'España', cl: ['Levante', 'Valencia'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Juan Carlos Valerón', nat: 'España', cl: ['Mallorca', 'Atlético Madrid', 'Deportivo'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Diego Tristán', nat: 'España', cl: ['Mallorca', 'Deportivo'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Savo Milošević', nat: 'Serbia', cl: ['Aston Villa', 'Zaragoza', 'Parma', 'Osasuna'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Giuseppe Rossi', nat: 'Italia', cl: ['Manchester United', 'Parma', 'Villarreal', 'Fiorentina', 'Levante'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Sergio Asenjo', nat: 'España', cl: ['Real Valladolid', 'Atlético Madrid', 'Villarreal'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Diego López', nat: 'España', cl: ['Real Madrid', 'Sevilla', 'Villarreal', 'AC Milan', 'Espanyol', 'Rayo Vallecano'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Willy Caballero', nat: 'Argentina', cl: ['Boca Juniors', 'Málaga', 'Manchester City', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Jeison Murillo', nat: 'Colombia', cl: ['Granada', 'Inter', 'Valencia', 'Sampdoria', 'Celta'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Odion Ighalo', nat: 'Nigeria', cl: ['Udinese', 'Granada', 'Watford', 'Manchester United', 'Al-Shabab'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Martin Braithwaite', nat: 'Dinamarca', cl: ['Toulouse', 'Middlesbrough', 'Leganés', 'Barcelona', 'Espanyol'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Gökhan Inler', nat: 'Suiza', cl: ['Udinese', 'Napoli', 'Leicester', 'Beşiktaş'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Kwadwo Asamoah', nat: 'Ghana', cl: ['Udinese', 'Juventus', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Simone Zaza', nat: 'Italia', cl: ['Sassuolo', 'Juventus', 'West Ham', 'Valencia', 'Torino'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Andrea Barzagli', nat: 'Italia', cl: ['Palermo', 'Wolfsburg', 'Juventus'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Javier Pastore', nat: 'Argentina', cl: ['Palermo', 'PSG', 'Roma'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Franco Vázquez', nat: 'Argentina', cl: ['Palermo', 'Sevilla', 'Parma'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Stevan Jovetić', nat: 'Montenegro', cl: ['Fiorentina', 'Manchester City', 'Inter', 'Monaco', 'Hertha'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Stefan Savić', nat: 'Montenegro', cl: ['Manchester City', 'Fiorentina', 'Atlético Madrid', 'Trabzonspor'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Adem Ljajić', nat: 'Serbia', cl: ['Fiorentina', 'Roma', 'Inter', 'Torino', 'Beşiktaş'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Jonas Hector', nat: 'Alemania', cl: ['Köln'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Max Kruse', nat: 'Alemania', cl: ['Werder Bremen', 'Borussia Mönchengladbach', 'Wolfsburg', 'Union Berlin'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Makoto Hasebe', nat: 'Japón', cl: ['Wolfsburg', 'Eintracht Frankfurt'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Naldo', nat: 'Brasil', cl: ['Werder Bremen', 'Wolfsburg', 'Schalke 04', 'Monaco'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Shinji Okazaki', nat: 'Japón', cl: ['Stuttgart', 'Mainz', 'Leicester'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'André-Pierre Gignac', nat: 'Francia', cl: ['Toulouse', 'Marseille'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Kévin Gameiro', nat: 'Francia', cl: ['Strasbourg', 'Lorient', 'PSG', 'Sevilla', 'Atlético Madrid', 'Valencia'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'M\'Baye Niang', nat: 'Senegal', cl: ['AC Milan', 'Watford', 'Torino', 'Rennes'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Wahbi Khazri', nat: 'Túnez', cl: ['Bordeaux', 'Sunderland', 'Rennes', 'Saint-Étienne', 'Montpellier'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Ellyes Skhiri', nat: 'Túnez', cl: ['Montpellier', 'Köln', 'Eintracht Frankfurt'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Faouzi Ghoulam', nat: 'Argelia', cl: ['Saint-Étienne', 'Napoli'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Ramy Bensebaini', nat: 'Argelia', cl: ['Montpellier', 'Rennes', 'Borussia Mönchengladbach', 'Borussia Dortmund'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Sofiane Boufal', nat: 'Marruecos', cl: ['Angers', 'Lille', 'Southampton'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Max Gradel', nat: 'Costa de Marfil', cl: ['Leeds', 'Saint-Étienne', 'Bournemouth', 'Toulouse'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Jean Michaël Seri', nat: 'Costa de Marfil', cl: ['Nice', 'Fulham', 'Hull'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Aiden McGeady', nat: 'Irlanda', cl: ['Celtic', 'Spartak', 'Everton', 'Sunderland'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Stewart Downing', nat: 'Inglaterra', cl: ['Middlesbrough', 'Aston Villa', 'Liverpool', 'West Ham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Darren Bent', nat: 'Inglaterra', cl: ['Tottenham', 'Sunderland', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Emile Heskey', nat: 'Inglaterra', cl: ['Leicester', 'Liverpool', 'Birmingham', 'Wigan', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Jussi Jääskeläinen', nat: 'Finlandia', cl: ['Bolton', 'West Ham'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'El-Hadji Diouf', nat: 'Senegal', cl: ['Lens', 'Liverpool', 'Bolton', 'Sunderland'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Hugo Rodallega', nat: 'Colombia', cl: ['Wigan', 'Fulham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Asmir Begović', nat: 'Bosnia', cl: ['Portsmouth', 'Stoke', 'Chelsea', 'Bournemouth', 'Everton'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Lassana Diarra', nat: 'Francia', cl: ['Chelsea', 'Arsenal', 'Portsmouth', 'Real Madrid', 'Marseille', 'PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'David James', nat: 'Inglaterra', cl: ['Liverpool', 'Aston Villa', 'West Ham', 'Manchester City', 'Portsmouth'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Niko Kranjčar', nat: 'Croacia', cl: ['Portsmouth', 'Tottenham', 'QPR'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Ben Foster', nat: 'Inglaterra', cl: ['Manchester United', 'Birmingham', 'West Bromwich Albion', 'Watford'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Tim Krul', nat: 'Países Bajos', cl: ['Newcastle', 'Norwich'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Koen Casteels', nat: 'Bélgica', cl: ['Hoffenheim', 'Werder Bremen', 'Wolfsburg'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Maarten Stekelenburg', nat: 'Países Bajos', cl: ['Ajax', 'Roma', 'Fulham', 'Southampton', 'Everton'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Steven Berghuis', nat: 'Países Bajos', cl: ['AZ', 'Watford', 'Feyenoord', 'Ajax'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Jozy Altidore', nat: 'Estados Unidos', cl: ['New York Red Bulls', 'Villarreal', 'AZ', 'Sunderland', 'Toronto'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Bernard', nat: 'Brasil', cl: ['Atlético Mineiro', 'Shakhtar', 'Everton', 'Panathinaikos'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Jô', nat: 'Brasil', cl: ['CSKA Moscú', 'Manchester City', 'Everton', 'Internacional', 'Atlético Mineiro'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Andrés D\'Alessandro', nat: 'Argentina', cl: ['River Plate', 'Wolfsburg', 'Zaragoza', 'Internacional'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Lucas Biglia', nat: 'Argentina', cl: ['Anderlecht', 'Lazio', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Éver Banega', nat: 'Argentina', cl: ['Boca Juniors', 'Valencia', 'Sevilla', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Lisandro López', nat: 'Argentina', cl: ['Porto', 'Lyon', 'Racing'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Franco Armani', nat: 'Argentina', cl: ['River Plate'], wc: 1, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Teófilo Gutiérrez', nat: 'Colombia', cl: ['River Plate', 'Sporting'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Jackson Martínez', nat: 'Colombia', cl: ['Porto', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Cristian Zapata', nat: 'Colombia', cl: ['Udinese', 'Villarreal', 'AC Milan', 'Genoa'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Camilo Zúñiga', nat: 'Colombia', cl: ['Napoli', 'Bologna', 'Watford'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Carlos Sánchez', nat: 'Colombia', cl: ['Aston Villa', 'Fiorentina', 'Espanyol', 'West Ham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Wilmar Barrios', nat: 'Colombia', cl: ['Boca Juniors', 'Zenit'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Cristhian Stuani', nat: 'Uruguay', cl: ['Espanyol', 'Middlesbrough', 'Girona'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Maxi Gómez', nat: 'Uruguay', cl: ['Celta', 'Valencia', 'Trabzonspor'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Felipe Caicedo', nat: 'Ecuador', cl: ['Basilea', 'Manchester City', 'Espanyol', 'Lazio'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Piero Hincapié', nat: 'Ecuador', cl: ['Talleres', 'Bayer Leverkusen', 'Arsenal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Renato Tapia', nat: 'Perú', cl: ['Twente', 'Feyenoord', 'Celta'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Gustavo Gómez', nat: 'Paraguay', cl: ['AC Milan', 'Palmeiras'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Josef Martínez', nat: 'Venezuela', cl: ['Torino', 'Atlanta United', 'Inter Miami'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Artem Dzyuba', nat: 'Rusia', cl: ['Spartak', 'Zenit'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Aleksandr Golovin', nat: 'Rusia', cl: ['CSKA Moscú', 'Monaco'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Alan Dzagoev', nat: 'Rusia', cl: ['CSKA Moscú'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Roman Pavlyuchenko', nat: 'Rusia', cl: ['Spartak', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Yuri Zhirkov', nat: 'Rusia', cl: ['CSKA Moscú', 'Chelsea', 'Zenit'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Ahmed Musa', nat: 'Nigeria', cl: ['CSKA Moscú', 'Leicester'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Cenk Tosun', nat: 'Turquía', cl: ['Eintracht Frankfurt', 'Beşiktaş', 'Everton', 'Crystal Palace'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Gylfi Sigurðsson', nat: 'Islandia', cl: ['Hoffenheim', 'Swansea', 'Tottenham', 'Everton'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Alfreð Finnbogason', nat: 'Islandia', cl: ['Heerenveen', 'Real Sociedad'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Steven Pienaar', nat: 'Sudáfrica', cl: ['Ajax', 'Borussia Dortmund', 'Everton', 'Tottenham', 'Sunderland'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Benni McCarthy', nat: 'Sudáfrica', cl: ['Ajax', 'Celta', 'Porto', 'Blackburn', 'West Ham'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },

    // --- Fichas de fusión: completan clubes que faltaban en jugadores existentes ---
    { n: 'Joaquín', nat: 'España', cl: ['Betis', 'Valencia', 'Málaga', 'Fiorentina'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Santi Cazorla', nat: 'España', cl: ['Villarreal', 'Málaga', 'Arsenal', 'Real Oviedo'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Isco', nat: 'España', cl: ['Málaga', 'Real Madrid', 'Sevilla', 'Betis'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Ander Herrera', nat: 'España', cl: ['Zaragoza', 'Athletic', 'Manchester United', 'PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Aritz Aduriz', nat: 'España', cl: ['Athletic', 'Mallorca', 'Valencia'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Fernando Llorente', nat: 'España', cl: ['Athletic', 'Juventus', 'Sevilla', 'Swansea', 'Tottenham', 'Napoli'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Vitolo', nat: 'España', cl: ['Sevilla', 'Atlético Madrid', 'Getafe'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Míchel Salgado', nat: 'España', cl: ['Celta', 'Real Madrid', 'Blackburn'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Rubén Baraja', nat: 'España', cl: ['Real Valladolid', 'Atlético Madrid', 'Valencia'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Pepe Reina', nat: 'España', cl: ['Barcelona', 'Villarreal', 'Liverpool', 'Napoli', 'Bayern Munich', 'AC Milan', 'Aston Villa', 'Lazio'], wc: 1, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Kepa Arrizabalaga', nat: 'España', cl: ['Athletic', 'Chelsea', 'Real Madrid', 'Bournemouth', 'Arsenal'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Fabio Quagliarella', nat: 'Italia', cl: ['Torino', 'Udinese', 'Napoli', 'Juventus', 'Sampdoria'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Antonio Di Natale', nat: 'Italia', cl: ['Empoli', 'Udinese'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Sebastian Giovinco', nat: 'Italia', cl: ['Juventus', 'Parma', 'Toronto'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Graziano Pellè', nat: 'Italia', cl: ['AZ', 'Feyenoord', 'Southampton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Fabio Grosso', nat: 'Italia', cl: ['Palermo', 'Inter', 'Lyon', 'Juventus'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Luca Toni', nat: 'Italia', cl: ['Palermo', 'Fiorentina', 'Bayern Munich', 'Verona'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Salvatore Sirigu', nat: 'Italia', cl: ['Palermo', 'PSG', 'Torino'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Matías Vecino', nat: 'Uruguay', cl: ['Empoli', 'Fiorentina', 'Inter', 'Lazio'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Lucas Torreira', nat: 'Uruguay', cl: ['Sampdoria', 'Arsenal', 'Atlético Madrid', 'Galatasaray'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Rodrigo Palacio', nat: 'Argentina', cl: ['Boca Juniors', 'Genoa', 'Inter', 'Bologna'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Gary Medel', nat: 'Chile', cl: ['Boca Juniors', 'Sevilla', 'Inter', 'Beşiktaş', 'Bologna'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Aleksandar Kolarov', nat: 'Serbia', cl: ['Lazio', 'Manchester City', 'Roma', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Sulley Muntari', nat: 'Ghana', cl: ['Udinese', 'Portsmouth', 'Inter', 'AC Milan'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'John Obi Mikel', nat: 'Nigeria', cl: ['Chelsea', 'Middlesbrough', 'Trabzonspor', 'Stoke'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Yuto Nagatomo', nat: 'Japón', cl: ['Cesena', 'Inter', 'Galatasaray', 'Marseille'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Kevin Volland', nat: 'Alemania', cl: ['Hoffenheim', 'Bayer Leverkusen', 'Monaco', 'Union Berlin'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Niklas Süle', nat: 'Alemania', cl: ['Hoffenheim', 'Bayern Munich', 'Borussia Dortmund'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Robin Gosens', nat: 'Alemania', cl: ['Atalanta', 'Inter', 'Union Berlin', 'Fiorentina'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Ante Rebić', nat: 'Croacia', cl: ['Fiorentina', 'Eintracht Frankfurt', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Claudio Pizarro', nat: 'Perú', cl: ['Werder Bremen', 'Bayern Munich', 'Chelsea', 'Köln'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Çağlar Söyüncü', nat: 'Turquía', cl: ['Freiburg', 'Leicester', 'Atlético Madrid', 'Fenerbahçe'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Moussa Sissoko', nat: 'Francia', cl: ['Toulouse', 'Newcastle', 'Tottenham', 'Watford', 'Nantes'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Burak Yılmaz', nat: 'Turquía', cl: ['Trabzonspor', 'Galatasaray', 'Beşiktaş', 'Lille'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Laurent Koscielny', nat: 'Francia', cl: ['Lorient', 'Arsenal', 'Bordeaux'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Steve Mandanda', nat: 'Francia', cl: ['Marseille', 'Crystal Palace', 'Rennes'], wc: 1, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Dimitri Payet', nat: 'Francia', cl: ['Nantes', 'Saint-Étienne', 'Lille', 'Marseille', 'West Ham', 'Vasco da Gama'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Islam Slimani', nat: 'Argelia', cl: ['Sporting', 'Leicester', 'Newcastle', 'Monaco', 'Lyon'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Alphonse Areola', nat: 'Francia', cl: ['PSG', 'Villarreal', 'Real Madrid', 'Fulham', 'West Ham'], wc: 1, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Youri Djorkaeff', nat: 'Francia', cl: ['Monaco', 'PSG', 'Inter', 'Bolton'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Salomon Kalou', nat: 'Costa de Marfil', cl: ['Feyenoord', 'Chelsea', 'Lille', 'Hertha'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Gervinho', nat: 'Costa de Marfil', cl: ['Lille', 'Arsenal', 'Roma', 'Parma'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Miralem Pjanić', nat: 'Bosnia', cl: ['Metz', 'Lyon', 'Roma', 'Juventus', 'Barcelona'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Shay Given', nat: 'Irlanda', cl: ['Newcastle', 'Manchester City', 'Aston Villa', 'Stoke'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Robbie Keane', nat: 'Irlanda', cl: ['Leeds', 'Tottenham', 'Liverpool', 'Inter', 'LA Galaxy', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Damien Duff', nat: 'Irlanda', cl: ['Blackburn', 'Chelsea', 'Newcastle', 'Fulham'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Gareth Barry', nat: 'Inglaterra', cl: ['Aston Villa', 'Manchester City', 'Everton', 'West Bromwich Albion'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Glen Johnson', nat: 'Inglaterra', cl: ['Chelsea', 'Portsmouth', 'Liverpool', 'Stoke'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Sol Campbell', nat: 'Inglaterra', cl: ['Tottenham', 'Arsenal', 'Portsmouth', 'Newcastle'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Nwankwo Kanu', nat: 'Nigeria', cl: ['Ajax', 'Inter', 'Arsenal', 'West Bromwich Albion', 'Portsmouth'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Simon Mignolet', nat: 'Bélgica', cl: ['Sunderland', 'Liverpool', 'Club Brugge'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Klaas-Jan Huntelaar', nat: 'Países Bajos', cl: ['Heerenveen', 'Ajax', 'Real Madrid', 'AC Milan', 'Schalke 04'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Davy Klaassen', nat: 'Países Bajos', cl: ['Ajax', 'Everton', 'Werder Bremen', 'Inter'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Donny van de Beek', nat: 'Países Bajos', cl: ['Ajax', 'Manchester United', 'Girona'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Michael Bradley', nat: 'Estados Unidos', cl: ['Heerenveen', 'Borussia Mönchengladbach', 'Roma', 'Toronto'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Landon Donovan', nat: 'Estados Unidos', cl: ['Bayer Leverkusen', 'LA Galaxy', 'Everton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Juninho Pernambucano', nat: 'Brasil', cl: ['Vasco da Gama', 'Lyon'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Elano', nat: 'Brasil', cl: ['Santos', 'Shakhtar', 'Manchester City', 'Grêmio'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Bebeto', nat: 'Brasil', cl: ['Vasco da Gama', 'Deportivo', 'Flamengo'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Marcos Acuña', nat: 'Argentina', cl: ['Racing', 'Sporting', 'Sevilla', 'River Plate'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Germán Pezzella', nat: 'Argentina', cl: ['River Plate', 'Betis', 'Fiorentina'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Nahuel Molina', nat: 'Argentina', cl: ['Boca Juniors', 'Udinese', 'Atlético Madrid'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Charles Aránguiz', nat: 'Chile', cl: ['Internacional', 'Bayer Leverkusen'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Eduardo Vargas', nat: 'Chile', cl: ['Napoli', 'QPR', 'Hoffenheim', 'Atlético Mineiro'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Mauricio Isla', nat: 'Chile', cl: ['Udinese', 'Juventus', 'QPR', 'Fenerbahçe', 'Flamengo'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Martín Cáceres', nat: 'Uruguay', cl: ['Barcelona', 'Sevilla', 'Juventus', 'Lazio', 'LA Galaxy'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Sebastián Coates', nat: 'Uruguay', cl: ['Liverpool', 'Sunderland', 'Sporting'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Enner Valencia', nat: 'Ecuador', cl: ['Pachuca', 'West Ham', 'Everton', 'Fenerbahçe', 'Internacional'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Pervis Estupiñán', nat: 'Ecuador', cl: ['Watford', 'Villarreal', 'Brighton', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Óscar Cardozo', nat: 'Paraguay', cl: ['Benfica', 'Trabzonspor'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Ki Sung-yueng', nat: 'Corea del Sur', cl: ['Celtic', 'Swansea', 'Sunderland', 'Newcastle', 'Mallorca'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'David Villa', nat: 'España', cl: ['Zaragoza', 'Valencia', 'Barcelona', 'Atlético Madrid'], wc: 1, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Luis Suárez', nat: 'Uruguay', cl: ['Groningen', 'Ajax', 'Liverpool', 'Barcelona', 'Atlético Madrid', 'Inter Miami'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Ronaldinho', nat: 'Brasil', cl: ['Grêmio', 'PSG', 'Barcelona', 'AC Milan', 'Flamengo', 'Atlético Mineiro'], wc: 1, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Rivaldo', nat: 'Brasil', cl: ['Palmeiras', 'Deportivo', 'Barcelona', 'AC Milan'], wc: 1, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Romário', nat: 'Brasil', cl: ['Vasco da Gama', 'PSV', 'Barcelona', 'Valencia', 'Flamengo'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Thierry Henry', nat: 'Francia', cl: ['Monaco', 'Juventus', 'Arsenal', 'Barcelona', 'New York Red Bulls'], wc: 1, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Steven Gerrard', nat: 'Inglaterra', cl: ['Liverpool', 'LA Galaxy'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Virgil van Dijk', nat: 'Países Bajos', cl: ['Groningen', 'Celtic', 'Southampton', 'Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Edgar Davids', nat: 'Países Bajos', cl: ['Ajax', 'AC Milan', 'Juventus', 'Barcelona', 'Inter', 'Tottenham'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Pablo Aimar', nat: 'Argentina', cl: ['River Plate', 'Valencia', 'Zaragoza', 'Benfica'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Gabi', nat: 'España', cl: ['Atlético Madrid', 'Zaragoza'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },

    // --- Ronda 4: leyendas Premier 2000s, campeones del mundo, porteros ---
    { n: 'Patrice Evra', nat: 'Francia', cl: ['Monaco', 'Manchester United', 'Juventus', 'Marseille', 'West Ham'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Michael Essien', nat: 'Ghana', cl: ['Lyon', 'Chelsea', 'Real Madrid', 'AC Milan'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Robert Pires', nat: 'Francia', cl: ['Metz', 'Marseille', 'Arsenal', 'Villarreal'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Robbie Fowler', nat: 'Inglaterra', cl: ['Liverpool', 'Leeds', 'Manchester City'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Momo Sissoko', nat: 'Malí', cl: ['Valencia', 'Liverpool', 'Juventus', 'PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Craig Bellamy', nat: 'Gales', cl: ['Newcastle', 'Blackburn', 'Liverpool', 'West Ham', 'Manchester City', 'Celtic'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Shaun Wright-Phillips', nat: 'Inglaterra', cl: ['Manchester City', 'Chelsea', 'QPR'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Joleon Lescott', nat: 'Inglaterra', cl: ['Everton', 'Manchester City', 'West Bromwich Albion', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Gaël Clichy', nat: 'Francia', cl: ['Arsenal', 'Manchester City', 'Başakşehir'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Scott Parker', nat: 'Inglaterra', cl: ['Chelsea', 'Newcastle', 'West Ham', 'Tottenham', 'Fulham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Gianluca Zambrotta', nat: 'Italia', cl: ['Juventus', 'Barcelona', 'AC Milan'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Simone Perrotta', nat: 'Italia', cl: ['Juventus', 'Chievo', 'Roma'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Vincenzo Iaquinta', nat: 'Italia', cl: ['Udinese', 'Juventus'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Fabien Barthez', nat: 'Francia', cl: ['Marseille', 'Monaco', 'Manchester United'], wc: 1, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Torsten Frings', nat: 'Alemania', cl: ['Werder Bremen', 'Borussia Dortmund', 'Bayern Munich'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Marko Marin', nat: 'Alemania', cl: ['Borussia Mönchengladbach', 'Werder Bremen', 'Chelsea', 'Sevilla'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Ilkay Gündoğan', nat: 'Alemania', cl: ['Núremberg', 'Borussia Dortmund', 'Manchester City', 'Barcelona'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Kevin Kampl', nat: 'Eslovenia', cl: ['Salzburgo', 'Borussia Dortmund', 'Bayer Leverkusen', 'RB Leipzig'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Pedro', nat: 'España', cl: ['Barcelona', 'Chelsea', 'Roma', 'Lazio'], wc: 1, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Nacho Fernández', nat: 'España', cl: ['Real Madrid', 'Al-Qadsiah'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Jorge Campos', nat: 'México', cl: ['Pumas', 'Atlante'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Seydou Keita', nat: 'Malí', cl: ['Lens', 'Sevilla', 'Barcelona', 'Valencia', 'Roma'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'John Utaka', nat: 'Nigeria', cl: ['Rennes', 'Portsmouth', 'Montpellier'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Baghdad Bounedjah', nat: 'Argelia', cl: ['Étoile du Sahel', 'Al-Sadd'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Sofiane Hanni', nat: 'Argelia', cl: ['Anderlecht', 'Spartak'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Joel Pohjanpalo', nat: 'Finlandia', cl: ['Bayer Leverkusen', 'Union Berlin', 'Venezia', 'Palermo'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Alexander Hleb', nat: 'Bielorrusia', cl: ['Stuttgart', 'Arsenal', 'Barcelona', 'Birmingham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Robert Mak', nat: 'Eslovaquia', cl: ['Núremberg', 'PSV', 'Konyaspor', 'Ferencváros'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Lasse Schöne', nat: 'Dinamarca', cl: ['Ajax', 'Genoa'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Emil Krafth', nat: 'Suecia', cl: ['Bologna', 'Amiens', 'Newcastle'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Joshua King', nat: 'Noruega', cl: ['Blackburn', 'Bournemouth', 'Everton', 'Watford'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Bas Dost', nat: 'Países Bajos', cl: ['Heerenveen', 'Wolfsburg', 'Sporting', 'Eintracht Frankfurt', 'Club Brugge'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Michel Vorm', nat: 'Países Bajos', cl: ['Utrecht', 'Swansea', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Kasper Dolberg', nat: 'Dinamarca', cl: ['Ajax', 'Nice', 'Anderlecht'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Anthony Lopes', nat: 'Portugal', cl: ['Lyon', 'Nantes'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Theofanis Gekas', nat: 'Grecia', cl: ['Bayer Leverkusen', 'Portsmouth', 'Eintracht Frankfurt'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Dušan Basta', nat: 'Serbia', cl: ['Lazio', 'Udinese'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Matija Nastasić', nat: 'Serbia', cl: ['Fiorentina', 'Manchester City', 'Schalke 04'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },

    // --- Fusiones ronda 4 ---
    { n: 'Dimitar Berbatov', nat: 'Bulgaria', cl: ['Bayer Leverkusen', 'Tottenham', 'Manchester United', 'Fulham', 'Monaco'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Nemanja Vidić', nat: 'Serbia', cl: ['Spartak', 'Manchester United', 'Inter'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Michael Carrick', nat: 'Inglaterra', cl: ['West Ham', 'Tottenham', 'Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Nani', nat: 'Portugal', cl: ['Sporting', 'Manchester United', 'Fenerbahçe', 'Valencia', 'Lazio', 'Orlando City'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Park Ji-sung', nat: 'Corea del Sur', cl: ['PSV', 'Manchester United', 'QPR'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Rio Ferdinand', nat: 'Inglaterra', cl: ['West Ham', 'Leeds', 'Manchester United', 'QPR'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Ashley Young', nat: 'Inglaterra', cl: ['Watford', 'Aston Villa', 'Manchester United', 'Inter', 'Everton'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Petr Čech', nat: 'República Checa', cl: ['Rennes', 'Chelsea', 'Arsenal'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Ashley Cole', nat: 'Inglaterra', cl: ['Arsenal', 'Chelsea', 'Roma', 'LA Galaxy'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'John Terry', nat: 'Inglaterra', cl: ['Chelsea', 'Aston Villa'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Joe Cole', nat: 'Inglaterra', cl: ['West Ham', 'Chelsea', 'Liverpool', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Robert Pirès', nat: 'Francia', cl: ['Metz', 'Marseille', 'Arsenal', 'Villarreal'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Kolo Touré', nat: 'Costa de Marfil', cl: ['Arsenal', 'Manchester City', 'Liverpool', 'Celtic'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Bacary Sagna', nat: 'Francia', cl: ['Auxerre', 'Arsenal', 'Manchester City'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Álvaro Arbeloa', nat: 'España', cl: ['Deportivo', 'Liverpool', 'Real Madrid', 'West Ham'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'James Milner', nat: 'Inglaterra', cl: ['Leeds', 'Newcastle', 'Aston Villa', 'Manchester City', 'Liverpool', 'Brighton'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Mauro Camoranesi', nat: 'Italia', cl: ['Juventus', 'Stuttgart'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Bixente Lizarazu', nat: 'Francia', cl: ['Bordeaux', 'Athletic', 'Bayern Munich'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Lilian Thuram', nat: 'Francia', cl: ['Monaco', 'Parma', 'Juventus', 'Barcelona'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Christophe Dugarry', nat: 'Francia', cl: ['Bordeaux', 'AC Milan', 'Barcelona', 'Marseille', 'Birmingham'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'David Trezeguet', nat: 'Francia', cl: ['Monaco', 'Juventus', 'River Plate'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Sylvain Wiltord', nat: 'Francia', cl: ['Bordeaux', 'Arsenal', 'Lyon', 'Marseille'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Claude Makélélé', nat: 'Francia', cl: ['Celta', 'Real Madrid', 'Chelsea', 'PSG'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Michael Ballack', nat: 'Alemania', cl: ['Kaiserslautern', 'Bayer Leverkusen', 'Bayern Munich', 'Chelsea'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Mario Gómez', nat: 'Alemania', cl: ['Stuttgart', 'Bayern Munich', 'Fiorentina', 'Beşiktaş', 'Wolfsburg'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Sami Khedira', nat: 'Alemania', cl: ['Stuttgart', 'Real Madrid', 'Juventus', 'Hertha'], wc: 1, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Per Mertesacker', nat: 'Alemania', cl: ['Hannover', 'Werder Bremen', 'Arsenal'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Kevin Großkreutz', nat: 'Alemania', cl: ['Borussia Dortmund', 'Galatasaray', 'Stuttgart'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Mats Hummels', nat: 'Alemania', cl: ['Bayern Munich', 'Borussia Dortmund', 'Roma'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Julian Draxler', nat: 'Alemania', cl: ['Schalke 04', 'Wolfsburg', 'PSG', 'Benfica'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Shkodran Mustafi', nat: 'Alemania', cl: ['Everton', 'Sampdoria', 'Valencia', 'Arsenal', 'Schalke 04'], wc: 1, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Marcel Sabitzer', nat: 'Austria', cl: ['RB Leipzig', 'Bayern Munich', 'Manchester United', 'Borussia Dortmund'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Xaver Schlager', nat: 'Austria', cl: ['Salzburgo', 'Wolfsburg', 'RB Leipzig'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Juan Mata', nat: 'España', cl: ['Valencia', 'Chelsea', 'Manchester United', 'Galatasaray'], wc: 1, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Marco Asensio', nat: 'España', cl: ['Mallorca', 'Real Madrid', 'PSG', 'Aston Villa'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Saúl Ñíguez', nat: 'España', cl: ['Atlético Madrid', 'Chelsea', 'Sevilla'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Juan Bernat', nat: 'España', cl: ['Valencia', 'Bayern Munich', 'PSG', 'Villarreal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Ansu Fati', nat: 'España', cl: ['Barcelona', 'Brighton', 'Monaco'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Rafael Márquez', nat: 'México', cl: ['Monaco', 'Barcelona', 'New York Red Bulls', 'Verona'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Giovani dos Santos', nat: 'México', cl: ['Barcelona', 'Tottenham', 'Villarreal', 'LA Galaxy'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Jesús Corona', nat: 'México', cl: ['Twente', 'Porto', 'Sevilla'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Miguel Layún', nat: 'México', cl: ['Watford', 'Porto', 'Sevilla', 'Villarreal'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Vincent Aboubakar', nat: 'Camerún', cl: ['Lorient', 'Porto', 'Beşiktaş', 'Al-Nassr'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'André Ayew', nat: 'Ghana', cl: ['Marseille', 'Swansea', 'West Ham', 'Nottingham Forest'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Nicklas Bendtner', nat: 'Dinamarca', cl: ['Arsenal', 'Sunderland', 'Juventus', 'Wolfsburg', 'Nottingham Forest'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Daniel Agger', nat: 'Dinamarca', cl: ['Liverpool', 'Brøndby'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Christian Eriksen', nat: 'Dinamarca', cl: ['Ajax', 'Tottenham', 'Inter', 'Brentford', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Simon Kjær', nat: 'Dinamarca', cl: ['Palermo', 'Wolfsburg', 'Roma', 'Sevilla', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Robin Olsen', nat: 'Suecia', cl: ['PAOK', 'Roma', 'Everton', 'Aston Villa'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Sander Berge', nat: 'Noruega', cl: ['Genk', 'Sheffield United', 'Burnley', 'Fulham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Georginio Wijnaldum', nat: 'Países Bajos', cl: ['Feyenoord', 'PSV', 'Newcastle', 'Liverpool', 'PSG', 'Roma'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Quincy Promes', nat: 'Países Bajos', cl: ['Twente', 'Spartak', 'Sevilla', 'Ajax'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Hugo Lloris', nat: 'Francia', cl: ['Nice', 'Lyon', 'Tottenham', 'LA Galaxy'], wc: 1, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Brad Friedel', nat: 'Estados Unidos', cl: ['Liverpool', 'Blackburn', 'Aston Villa', 'Tottenham'], wc: 0, ucl: 0, bdo: 0, pos: 'POR' },
    { n: 'Łukasz Piszczek', nat: 'Polonia', cl: ['Hertha', 'Borussia Dortmund'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Kamil Glik', nat: 'Polonia', cl: ['Palermo', 'Torino', 'Monaco', 'Benevento'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Grzegorz Krychowiak', nat: 'Polonia', cl: ['Sevilla', 'PSG', 'West Bromwich Albion', 'Lokomotiv Moscú'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Arkadiusz Milik', nat: 'Polonia', cl: ['Ajax', 'Napoli', 'Marseille', 'Juventus'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Arda Turan', nat: 'Turquía', cl: ['Galatasaray', 'Atlético Madrid', 'Barcelona', 'Başakşehir'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Hakan Şükür', nat: 'Turquía', cl: ['Galatasaray', 'Torino', 'Inter', 'Parma', 'Blackburn'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Nuri Şahin', nat: 'Turquía', cl: ['Borussia Dortmund', 'Real Madrid', 'Liverpool', 'Werder Bremen'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Emre Belözoğlu', nat: 'Turquía', cl: ['Galatasaray', 'Inter', 'Newcastle', 'Fenerbahçe', 'Atlético Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Kostas Manolas', nat: 'Grecia', cl: ['Olympiacos', 'Roma', 'Napoli'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Sokratis Papastathopoulos', nat: 'Grecia', cl: ['Genoa', 'Werder Bremen', 'Borussia Dortmund', 'Arsenal', 'Olympiacos'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
    { n: 'Giorgos Karagounis', nat: 'Grecia', cl: ['Inter', 'Panathinaikos', 'Benfica', 'Fulham'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' },
    { n: 'Branislav Ivanović', nat: 'Serbia', cl: ['Lokomotiv Moscú', 'Chelsea', 'Zenit', 'West Bromwich Albion'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Nemanja Matić', nat: 'Serbia', cl: ['Chelsea', 'Benfica', 'Manchester United', 'Roma', 'Rennes', 'Lyon'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' }
  ];
  // Deduplicar por nombre UNIENDO datos: si el mismo jugador aparece varias veces
  // (a veces una copia trae más clubes que otra), se fusionan los clubes y los
  // logros en vez de descartar la información. Así no se pierde ningún club real
  // (evita el fallo "jugó en ese equipo pero la app dice que no").
  (function () {
    var byName = {}, order = [];
    P.forEach(function (p) {
      var e = byName[p.n];
      if (e) {
        p.cl.forEach(function (c) { if (e.cl.indexOf(c) < 0) e.cl.push(c); });
        e.wc = e.wc || p.wc; e.ucl = e.ucl || p.ucl; e.bdo = e.bdo || p.bdo;
        if (!p._skip) e._skip = 0; // una copia real desmarca el _skip heredado
      } else {
        byName[p.n] = p; order.push(p);
      }
    });
    P = order;
  })();
  // quitar solo los rellenos de control que quedaron sin copia real
  P = P.filter(function (p) { return !p._skip; });

  /* ---------- Alias manuales (además del apellido y nombre completo) ---------- */
  var ALIAS = {
    'Lionel Messi': ['messi', 'leo messi', 'la pulga'],
    'Cristiano Ronaldo': ['cristiano', 'cr7', 'ronaldo cristiano'],
    'Ronaldo Nazário': ['ronaldo', 'ronaldo brasileño', 'el fenomeno', 'r9'],
    'Diego Maradona': ['maradona', 'el diego', 'pelusa'],
    'Zlatan Ibrahimović': ['zlatan', 'ibra'],
    'Kylian Mbappé': ['mbappe'],
    'Karim Benzema': ['benzema'],
    'Luka Modrić': ['modric'],
    'Robert Lewandowski': ['lewandowski', 'lewa'],
    'Andrés Iniesta': ['iniesta'],
    'Xavi Hernández': ['xavi'],
    'Sergio Agüero': ['aguero', 'kun aguero', 'el kun'],
    'Ángel Di María': ['di maria', 'fideo'],
    "N'Golo Kanté": ['kante'],
    'Ronaldinho': ['ronaldinho', 'dinho'],
    "Samuel Eto'o": ['etoo', 'eto o'],
    'Raúl González': ['raul'],
    'James Rodríguez': ['james'],
    'Andriy Shevchenko': ['sheva', 'shevchenko'],
    'Gonzalo Higuaín': ['higuain', 'pipita'],
    'Zlatan Ibrahimović': ['zlatan', 'ibra', 'ibrahimovic'],
    'İlkay Gündoğan': ['gundogan'],
    'Son Heung-min': ['son', 'heung min']
  };

  /* ---------- Normalización ---------- */
  function normalize(s) {
    return (s || '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '') // quitar acentos
      .replace(/[^a-z0-9\s]/g, ' ')    // quitar puntuación
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Índice de búsqueda: para cada jugador, un set de claves normalizadas
  P.forEach(function (p) {
    var keys = {};
    keys[normalize(p.n)] = 1;
    // apellido (último token)
    var toks = normalize(p.n).split(' ');
    if (toks.length > 1) keys[toks[toks.length - 1]] = 1;
    (ALIAS[p.n] || []).forEach(function (a) { keys[normalize(a)] = 1; });
    p._keys = keys;
  });

  /* ---------- Años de nacimiento (verificados; se muestran en el buscador) ----------
     Sólo se incluye el año cuando está contrastado. Si un jugador no aparece
     aquí, la interfaz simplemente no muestra el dato (nunca se inventa). */
  var BIRTH_YEAR = {
    'Lionel Messi': 1987, 'Cristiano Ronaldo': 1985, 'Neymar': 1992, 'Kylian Mbappé': 1998,
    'Erling Haaland': 2000, 'Diego Maradona': 1960, 'Pelé': 1940, 'Ronaldo Nazário': 1976,
    'Ronaldinho': 1980, 'Kaká': 1982, 'Rivaldo': 1972, 'Romário': 1966,
    'Zinedine Zidane': 1972, 'Thierry Henry': 1977, 'Karim Benzema': 1987, 'Antoine Griezmann': 1991,
    'Paul Pogba': 1993, "N'Golo Kanté": 1991, 'Hugo Lloris': 1986, 'Raphaël Varane': 1993,
    'Didier Deschamps': 1968, 'Patrick Vieira': 1976, 'Franck Ribéry': 1983, 'Olivier Giroud': 1986,
    'Ousmane Dembélé': 1997, 'Eduardo Camavinga': 2002, 'Aurélien Tchouaméni': 2000,
    'Andrés Iniesta': 1984, 'Xavi Hernández': 1980, 'Sergio Ramos': 1986, 'Gerard Piqué': 1987,
    'Iker Casillas': 1981, 'Carles Puyol': 1978, 'Sergio Busquets': 1988, 'David Villa': 1981,
    'Fernando Torres': 1984, 'David Silva': 1986, 'Xabi Alonso': 1981, 'Cesc Fàbregas': 1987,
    'Rodri': 1996, 'Raúl González': 1977, 'Fernando Morientes': 1976, 'Pedri': 2002,
    'Gavi': 2004, 'Lamine Yamal': 2007, 'Nico Williams': 2002, 'Álvaro Morata': 1992, 'Isco': 1992,
    'Luís Figo': 1972, 'Deco': 1977, 'Rui Costa': 1972, 'Pepe': 1983, 'Bernardo Silva': 1994,
    'Rúben Dias': 1997, 'Bruno Fernandes': 1994, 'João Félix': 1999, 'Rafael Leão': 1999, 'Vitinha': 2000,
    'Toni Kroos': 1990, 'Manuel Neuer': 1986, 'Thomas Müller': 1989, 'Philipp Lahm': 1983,
    'Bastian Schweinsteiger': 1984, 'Miroslav Klose': 1978, 'Mesut Özil': 1988, 'Oliver Kahn': 1969,
    'Michael Ballack': 1976, 'Lukas Podolski': 1985, 'Marco Reus': 1989, 'Leroy Sané': 1996,
    'Serge Gnabry': 1995, 'Kai Havertz': 1999, 'Jamal Musiala': 2003, 'Florian Wirtz': 2003,
    'Joshua Kimmich': 1995, 'Leon Goretzka': 1995,
    'Gianluigi Buffon': 1978, 'Andrea Pirlo': 1979, 'Paolo Maldini': 1968, 'Francesco Totti': 1976,
    'Alessandro Del Piero': 1974, 'Fabio Cannavaro': 1973, 'Alessandro Nesta': 1976, 'Gennaro Gattuso': 1978,
    'Roberto Baggio': 1967, 'Gianluigi Donnarumma': 1999, 'Federico Chiesa': 1997, 'Nicolò Barella': 1997,
    'Ciro Immobile': 1990, 'Lorenzo Insigne': 1991,
    'Marco van Basten': 1964, 'Ruud Gullit': 1962, 'Dennis Bergkamp': 1969, 'Arjen Robben': 1984,
    'Robin van Persie': 1983, 'Ruud van Nistelrooy': 1976, 'Frenkie de Jong': 1997, 'Matthijs de Ligt': 1999,
    'Virgil van Dijk': 1991, 'Memphis Depay': 1994, 'Cody Gakpo': 1999, 'Johan Cruyff': 1947,
    'Clarence Seedorf': 1976, 'Edgar Davids': 1973, 'Wesley Sneijder': 1984,
    'Luka Modrić': 1985, 'Ivan Rakitić': 1988, 'Mario Mandžukić': 1986, 'Ivan Perišić': 1989,
    'Mateo Kovačić': 1994, 'Joško Gvardiol': 2002,
    'Eden Hazard': 1991, 'Kevin De Bruyne': 1991, 'Romelu Lukaku': 1993, 'Thibaut Courtois': 1992,
    'Vincent Kompany': 1986, 'Jan Vertonghen': 1987, 'Dries Mertens': 1987, 'Christian Benteke': 1990,
    'Harry Kane': 1993, 'Wayne Rooney': 1985, 'David Beckham': 1975, 'Steven Gerrard': 1980,
    'Frank Lampard': 1978, 'Michael Owen': 1979, 'Alan Shearer': 1970, 'Gary Lineker': 1960,
    'Raheem Sterling': 1994, 'Jude Bellingham': 2003, 'Bukayo Saka': 2001, 'Phil Foden': 2000,
    'Cole Palmer': 2002, 'Declan Rice': 1999, 'Marcus Rashford': 1997, 'Trent Alexander-Arnold': 1998,
    'John Stones': 1994, 'Kyle Walker': 1990, 'Jack Grealish': 1995, 'Jadon Sancho': 2000,
    'Peter Crouch': 1981, 'Jermain Defoe': 1982, 'Emile Heskey': 1978, 'Sol Campbell': 1974,
    'Rio Ferdinand': 1978, 'John Terry': 1980, 'Ashley Cole': 1980, 'Gareth Bale': 1989, 'Aaron Ramsey': 1990,
    'Luis Suárez': 1987, 'Edinson Cavani': 1987, 'Diego Forlán': 1979, 'Federico Valverde': 1998,
    'Darwin Núñez': 1999, 'Diego Godín': 1986,
    'Sergio Agüero': 1988, 'Ángel Di María': 1988, 'Gonzalo Higuaín': 1987, 'Carlos Tevez': 1984,
    'Javier Mascherano': 1984, 'Juan Román Riquelme': 1978, 'Gabriel Batistuta': 1969, 'Hernán Crespo': 1975,
    'Emiliano Martínez': 1992, 'Julián Álvarez': 2000, 'Lautaro Martínez': 1997, 'Enzo Fernández': 2001,
    'Alexis Mac Allister': 1998, 'Rodrigo De Paul': 1994, 'Paulo Dybala': 1993, 'Mauro Icardi': 1993,
    'James Rodríguez': 1991, 'Radamel Falcao': 1986, 'Luis Díaz': 1997, 'Juan Cuadrado': 1988,
    'Alexis Sánchez': 1988, 'Arturo Vidal': 1987, 'Claudio Bravo': 1983,
    'Vinícius Júnior': 2000, 'Casemiro': 1992, 'Marcelo': 1988, 'Dani Alves': 1983, 'Thiago Silva': 1984,
    'Alisson': 1992, 'Ederson': 1993, 'Roberto Firmino': 1991, 'Gabriel Jesus': 1997, 'Raphinha': 1996,
    'Richarlison': 1997, 'Cafú': 1970, 'Roberto Carlos': 1973,
    'Robert Lewandowski': 1988, 'Wojciech Szczęsny': 1990, 'Zlatan Ibrahimović': 1981, 'Alexander Isak': 1999,
    'Victor Osimhen': 1998, 'Jay-Jay Okocha': 1973, 'Didier Drogba': 1978, 'Yaya Touré': 1983,
    "Samuel Eto'o": 1981, 'Sadio Mané': 1992, 'Mohamed Salah': 1992, 'Riyad Mahrez': 1991,
    'Achraf Hakimi': 1998, 'Pierre-Emerick Aubameyang': 1989, 'George Weah': 1966,
    'Son Heung-min': 1992, 'Keylor Navas': 1986, 'Guillermo Ochoa': 1985, 'Javier Hernández': 1988,
    'Hirving Lozano': 1995, 'Christian Pulisic': 1998, 'Khvicha Kvaratskhelia': 2001,
    'Martin Ødegaard': 1998, 'Viktor Gyökeres': 1998, 'Dušan Vlahović': 2000
  };
  P.forEach(function (p) { if (BIRTH_YEAR[p.n]) p.b = BIRTH_YEAR[p.n]; });

  /* ---------- Categorías ---------- */
  // tipo: 'nat' | 'club' | 'ach' | 'pos'
  function cat(id, label, type, test, tier) {
    return { id: id, label: label, type: type, test: test, tier: tier || 1 };
  }

  // Nacionalidades con su rareza (tier): 1 = muy común … 4 = rara
  var NAT_TIER = {
    'Argentina': 1, 'Brasil': 1, 'Francia': 1, 'España': 1,
    'Portugal': 2, 'Alemania': 2, 'Italia': 2, 'Inglaterra': 2,
    'Países Bajos': 3, 'Uruguay': 3, 'Bélgica': 3, 'Croacia': 3,
    'Colombia': 4, 'Chile': 4, 'México': 4, 'Marruecos': 4, 'Senegal': 4,
    'Suecia': 3, 'Dinamarca': 3, 'Polonia': 3, 'Noruega': 3, 'Serbia': 3, 'Gales': 3,
    'Egipto': 4, 'Ucrania': 4, 'Costa de Marfil': 4, 'Camerún': 4, 'Ghana': 4,
    'Nigeria': 4, 'Austria': 4, 'Turquía': 4, 'Japón': 4, 'Corea del Sur': 4,
    'Bulgaria': 4, 'Rumanía': 4, 'Escocia': 4, 'República Checa': 4, 'Estados Unidos': 4, 'Australia': 4,
    'Hungría': 4, 'Ecuador': 4, 'Georgia': 4, 'Suiza': 3, 'Grecia': 4, 'Irán': 4, 'Rusia': 4,
    'Irlanda': 4, 'Bosnia': 4, 'Eslovaquia': 4, 'Eslovenia': 4, 'Macedonia del Norte': 4,
    'Perú': 4, 'Canadá': 4,
    'Argelia': 4, 'Liberia': 4, 'Irlanda del Norte': 4, 'Costa Rica': 4, 'Finlandia': 4,
    'Malí': 4, 'Armenia': 4, 'Guinea': 4, 'Paraguay': 4, 'Venezuela': 4,
    'Jamaica': 4, 'RD Congo': 4, 'Gabón': 4, 'Nueva Zelanda': 4, 'Togo': 4,
    'Montenegro': 4, 'Túnez': 4, 'Sudáfrica': 4, 'Islandia': 4, 'Bielorrusia': 4
  };
  // Clubes con su tier (cada uno es una categoría "Jugó en <club>")
  var CLUB_TIER = {
    'Real Madrid': 1, 'Barcelona': 1, 'Manchester United': 1, 'Bayern Munich': 1, 'Juventus': 1, 'Liverpool': 1,
    'Chelsea': 2, 'PSG': 2, 'AC Milan': 2, 'Inter': 2, 'Manchester City': 2, 'Atlético Madrid': 2, 'Arsenal': 2, 'Tottenham': 2,
    'Ajax': 3, 'Monaco': 3, 'Napoli': 3, 'Roma': 3, 'Porto': 3, 'Benfica': 3, 'Borussia Dortmund': 3,
    'Sevilla': 3, 'Valencia': 3, 'Lazio': 3, 'Marseille': 3, 'Lyon': 3, 'Boca Juniors': 3, 'River Plate': 3,
    'Atalanta': 3, 'Torino': 3, 'Galatasaray': 3, 'Fenerbahçe': 3, 'Celtic': 3, 'Zenit': 3,
    'Schalke 04': 3, 'Bayer Leverkusen': 3, 'Werder Bremen': 3, 'Real Sociedad': 3, 'Flamengo': 3,
    'Newcastle': 4, 'Leicester': 4, 'Everton': 4, 'Fiorentina': 4, 'Sporting': 4, 'PSV': 4, 'Feyenoord': 4,
    'Villarreal': 4, 'Aston Villa': 4, 'Santos': 4, 'Sampdoria': 4, 'Udinese': 4, 'Parma': 4, 'Genoa': 4,
    'Sassuolo': 4, 'Lille': 4, 'Bordeaux': 4, 'Nice': 4, 'Betis': 4, 'Athletic': 4, 'Espanyol': 4, 'Celta': 4,
    'Crystal Palace': 4, 'Wolves': 4, 'Nottingham Forest': 4, 'Swansea': 4, 'West Ham': 4, 'Fulham': 4,
    'Stuttgart': 4, 'Borussia Mönchengladbach': 4, 'Wolfsburg': 4, 'Eintracht Frankfurt': 4, 'RB Leipzig': 4,
    'Rangers': 4, 'Beşiktaş': 4, 'Shakhtar': 4, 'Anderlecht': 4, 'Palmeiras': 4, 'Corinthians': 4,
    'São Paulo': 4, 'Salzburgo': 4,
    // Ampliación de equipos (cada uno = categoría "Jugó en <club>")
    'Bologna': 4, 'Cagliari': 4, 'Verona': 4, 'Freiburg': 4, 'Hoffenheim': 4, 'Mainz': 4, 'Hamburgo': 4,
    'Brighton': 4, 'Brentford': 4, 'Bournemouth': 4, 'Southampton': 4, 'Leeds': 4, 'Burnley': 4,
    'Lens': 4, 'Nantes': 4, 'Saint-Étienne': 4, 'Montpellier': 4, 'Feyenoord': 4, 'AZ': 4, 'Twente': 4,
    'Braga': 4, 'Trabzonspor': 4, 'Fenerbahçe': 4, 'Galatasaray': 4, 'Grêmio': 4, 'Internacional': 4,
    'Fluminense': 4, 'Botafogo': 4, 'Racing': 4, 'Independiente': 4, 'Al-Nassr': 4, 'Al-Hilal': 4,
    'Al-Ittihad': 4, 'Al-Ahli': 4, 'Getafe': 4, 'Girona': 4, 'Deportivo': 4, 'Mallorca': 4,
    'CSKA Moscú': 4, 'Spartak': 4, 'Club Brugge': 4, 'Nottingham Forest': 4,
    // Equipos reconocibles de media tabla / históricos (estilo Crystal Palace)
    'Stoke': 4, 'Sunderland': 4, 'Watford': 4, 'Sheffield United': 4, 'Norwich': 4,
    'Middlesbrough': 4, 'West Bromwich Albion': 4, 'Blackburn': 4, 'Hull': 4,
    'Köln': 4, 'Union Berlin': 4, 'Hertha': 4, 'Genk': 4, 'Standard Lieja': 4,
    'Empoli': 4, 'Osasuna': 4, 'Rayo Vallecano': 4, 'Toulouse': 4, 'Strasbourg': 4,
    'Aberdeen': 4, 'Utrecht': 4, 'Vitesse': 4, 'QPR': 4,
    // Más media tabla de las 5 grandes ligas (+ frecuentes en la base)
    'Rennes': 4, 'LA Galaxy': 4, 'Palermo': 4, 'Inter Miami': 4, 'Málaga': 4,
    'Basilea': 4, 'Metz': 4, 'Reims': 4, 'Zaragoza': 4, 'Bolton': 4, 'Wigan': 4,
    'Levante': 4, 'Granada': 4, 'Alavés': 4, 'Almería': 4, 'Real Valladolid': 4,
    'Brescia': 4, 'Lecce': 4, 'Salernitana': 4, 'Portsmouth': 4, 'Huddersfield': 4,
    'Auxerre': 4, 'Angers': 4, 'Lorient': 4, 'Heerenveen': 4, 'Groningen': 4,
    'Cruzeiro': 4, 'Atlético Mineiro': 4, 'Vasco da Gama': 4, 'Toronto': 4
  };
  // Ligas → clubes que pertenecen a cada una (cobertura amplia para no rechazar
  // por error a quien jugó en la liga aunque fuera en un club "menor")
  var LEAGUES = {
    'Jugó en la Premier League': { tier: 1, clubs: ['Manchester United', 'Manchester City', 'Arsenal', 'Chelsea', 'Liverpool', 'Tottenham', 'Aston Villa', 'Brighton', 'Leicester', 'Southampton', 'Everton', 'Leeds', 'West Ham', 'Blackburn', 'Newcastle', 'Fulham', 'Crystal Palace', 'Wolves', 'Nottingham Forest', 'Swansea', 'Stoke', 'Bournemouth', 'Sunderland', 'Watford', 'Middlesbrough', 'Bolton', 'Brentford', 'Burnley', 'Norwich', 'Birmingham', 'Wigan', 'Hull', 'Sheffield United', 'QPR', 'Huddersfield', 'Portsmouth'] },
    'Jugó en LaLiga': { tier: 1, clubs: ['Barcelona', 'Real Madrid', 'Atlético Madrid', 'Sevilla', 'Valencia', 'Real Sociedad', 'Villarreal', 'Mallorca', 'Málaga', 'Levante', 'Betis', 'Athletic', 'Espanyol', 'Zaragoza', 'Deportivo', 'Celta', 'Girona', 'Osasuna', 'Granada', 'Tenerife', 'Getafe', 'Rayo Vallecano', 'Leganés', 'Real Valladolid', 'Alavés', 'Almería'] },
    'Jugó en la Serie A': { tier: 2, clubs: ['Napoli', 'Juventus', 'Inter', 'AC Milan', 'Fiorentina', 'Roma', 'Lazio', 'Parma', 'Udinese', 'Palermo', 'Cagliari', 'Sampdoria', 'Atalanta', 'Torino', 'Genoa', 'Sassuolo', 'Bologna', 'Verona', 'Pisa', 'Cesena', 'Empoli', 'Brescia', 'Catania', 'Perugia', 'Salernitana', 'Lecce'] },
    'Jugó en la Bundesliga': { tier: 2, clubs: ['Bayern Munich', 'Borussia Dortmund', 'Schalke 04', 'Werder Bremen', 'Hamburgo', 'Bayer Leverkusen', 'RB Leipzig', 'Stuttgart', 'Borussia Mönchengladbach', 'Wolfsburg', 'Eintracht Frankfurt', 'Hoffenheim', 'Freiburg', 'Mainz', 'Núremberg', 'Hertha', 'Köln', 'Union Berlin', 'Ingolstadt', 'Hannover'] },
    'Jugó en la Ligue 1': { tier: 3, clubs: ['PSG', 'Monaco', 'Lyon', 'Marseille', 'Lille', 'Rennes', 'Montpellier', 'Bordeaux', 'Reims', 'Lens', 'Nice', 'Saint-Étienne', 'Nantes', 'Metz', 'Toulouse', 'Strasbourg', 'Guingamp', 'Troyes', 'Lorient', 'Angers', 'Auxerre', 'Ajaccio'] },
    'Jugó en la Eredivisie': { tier: 3, clubs: ['Ajax', 'PSV', 'Feyenoord', 'AZ', 'Twente', 'Utrecht', 'Vitesse', 'Heerenveen', 'Groningen'] },
    'Jugó en la Primeira Liga': { tier: 3, clubs: ['Porto', 'Benfica', 'Sporting', 'Braga'] },
    'Jugó en la Süper Lig': { tier: 4, clubs: ['Galatasaray', 'Fenerbahçe', 'Beşiktaş', 'Kasımpaşa', 'Trabzonspor'] },
    'Jugó en el Brasileirão': { tier: 4, clubs: ['Flamengo', 'Botafogo', 'Corinthians', 'São Paulo', 'Fluminense', 'Palmeiras', 'Santos', 'Athletico Paranaense', 'Grêmio', 'Internacional', 'Cruzeiro', 'Atlético Mineiro', 'Vasco da Gama'] },
    'Jugó en la MLS': { tier: 4, clubs: ['Inter Miami', 'LA Galaxy', 'Toronto', 'New York Red Bulls', 'Atlanta United', 'Vancouver Whitecaps', 'San Diego', 'Seattle Sounders'] },
    'Jugó en la Saudi Pro League': { tier: 4, clubs: ['Al-Nassr', 'Al-Hilal', 'Al-Ittihad', 'Al-Ahli', 'Al-Shabab'] }
  };

  var CATS = [];
  Object.keys(NAT_TIER).forEach(function (name) {
    CATS.push(cat('nat_' + name, name, 'nat', (function (nm) { return function (p) { return p.nat === nm; }; })(name), NAT_TIER[name]));
  });
  Object.keys(CLUB_TIER).forEach(function (c) {
    CATS.push(cat('club_' + c, c, 'club', (function (cl) { return function (p) { return p.cl.indexOf(cl) >= 0; }; })(c), CLUB_TIER[c]));
  });
  Object.keys(LEAGUES).forEach(function (lab) {
    var set = LEAGUES[lab].clubs;
    CATS.push(cat('lg_' + lab, lab, 'league', (function (clubs) { return function (p) { return p.cl.some(function (x) { return clubs.indexOf(x) >= 0; }); }; })(set), LEAGUES[lab].tier));
  });
  CATS.push(cat('ach_wc', 'Ganó el Mundial', 'ach', function (p) { return !!p.wc; }, 1));
  CATS.push(cat('ach_ucl', 'Ganó la Champions', 'ach', function (p) { return !!p.ucl; }, 1));
  CATS.push(cat('ach_bdo', 'Ganó el Balón de Oro', 'ach', function (p) { return !!p.bdo; }, 2));
  CATS.push(cat('pos_DEL', 'Delantero', 'pos', function (p) { return p.pos === 'DEL'; }, 2));
  CATS.push(cat('pos_DEF', 'Defensa', 'pos', function (p) { return p.pos === 'DEF'; }, 2));
  CATS.push(cat('pos_MED', 'Mediocampista', 'pos', function (p) { return p.pos === 'MED'; }, 3));
  CATS.push(cat('pos_POR', 'Portero', 'pos', function (p) { return p.pos === 'POR'; }, 3));

  var CAT_BY_ID = {};
  CATS.forEach(function (c) { CAT_BY_ID[c.id] = c; });

  // Precálculo: para cada categoría, índices de jugadores que la cumplen (+ set)
  CATS.forEach(function (c) {
    var m = [], set = {};
    for (var i = 0; i < P.length; i++) if (c.test(P[i])) { m.push(i); set[i] = 1; }
    c._members = m; c._set = set;
  });
  // Salvaguarda: descarta cualquier categoría sin jugadores (0 miembros). Así una
  // categoría vacía nunca puede elegirse ni romper la generación del tablero.
  CATS = CATS.filter(function (c) { return c._members.length > 0; });
  CAT_BY_ID = {};
  CATS.forEach(function (c) { CAT_BY_ID[c.id] = c; });

  /* ---------- Solucionadores ---------- */
  function solvers(rowCat, colCat) {
    var out = [];
    for (var i = 0; i < P.length; i++) {
      if (rowCat.test(P[i]) && colCat.test(P[i])) out.push(P[i].n);
    }
    return out;
  }
  // Recuento rápido de intersección usando el precálculo (sin recorrer toda la BD)
  function pairCount(a, b) {
    var arr = a._members, set = b._set;
    if (a._members.length > b._members.length) { arr = b._members; set = a._set; }
    var n = 0;
    for (var i = 0; i < arr.length; i++) if (set[arr[i]]) n++;
    return n;
  }

  // ¿pueden dos categorías coexistir en un eje razonable? (evita nat×nat, pos×pos, mismo id)
  function compatibleAxisPair() { return true; }

  // Config por nivel:
  //  min      = respuestas mínimas por casilla
  //  poolTier = rareza máxima de categorías admitidas (1 común … 4 rara)
  //  hardMin/hardCells = al menos `hardCells` casillas deben tener ≤ `hardMin` respuestas
  //  ai       = fuerza de la máquina
  //  autocomplete = 'full' | 'limited' | 'none'
  //  onesCells = casillas con EXACTAMENTE 1 respuesta (lo más difícil)
  //  seconds   = segundos por turno cuando el cronómetro está activo
  var DIFF = {
    facil:    { min: 6, poolTier: 1, hardMin: 99, hardCells: 0, onesCells: 0, ai: 'random',  autocomplete: 'full', seconds: 60 },
    medio:    { min: 3, poolTier: 2, hardMin: 3,  hardCells: 2, onesCells: 0, ai: 'greedy',  autocomplete: 'full', seconds: 60 },
    dificil:  { min: 2, poolTier: 3, hardMin: 3,  hardCells: 4, onesCells: 0, ai: 'hard',    autocomplete: 'full', seconds: 60 },
    ultimate: { min: 1, poolTier: 4, hardMin: 2,  hardCells: 6, onesCells: 2, ai: 'perfect', autocomplete: 'full', seconds: 45 }
  };

  // Pool de categorías elegibles como EJE del tablero. Se exige un mínimo de
  // jugadores (AXIS_MIN) para que dos categorías puedan cruzarse de forma fiable:
  // así los clubes muy poco poblados siguen siendo respuestas válidas al escribir,
  // pero no se eligen como cabecera (lo que antes podía impedir generar el tablero).
  var AXIS_MIN = 3;
  function pool(maxTier) {
    var p = CATS.filter(function (c) { return c.tier <= maxTier && c._members.length >= AXIS_MIN; });
    // Salvaguarda: si por lo que sea quedaran pocas, relajamos el mínimo.
    if (p.length < 8) p = CATS.filter(function (c) { return c.tier <= maxTier && c._members.length >= 2; });
    return p;
  }

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // Genera una cuadrícula 3x3 resoluble y con la exigencia pedida por el nivel
  function generateGrid(difficulty) {
    var cfg = DIFF[difficulty] || DIFF.facil;
    var candidates = pool(cfg.poolTier);

    var ones = cfg.onesCells || 0;
    // Vamos relajando la exigencia si no encontramos algo perfecto
    var plans = [
      { need: cfg.min, hardMin: cfg.hardMin, hardCells: cfg.hardCells, ones: ones },
      { need: Math.max(1, cfg.min), hardMin: cfg.hardMin + 1, hardCells: Math.max(0, cfg.hardCells - 1), ones: Math.max(0, ones - 1) },
      { need: 1, hardMin: cfg.hardMin + 2, hardCells: Math.max(0, cfg.hardCells - 2), ones: 0 },
      { need: 1, hardMin: 99, hardCells: 0, ones: 0 }
    ];

    for (var pi = 0; pi < plans.length; pi++) {
      var plan = plans[pi];
      for (var attempt = 0; attempt < 8000; attempt++) {
        var pick = shuffle(candidates);
        var rows = pick.slice(0, 3);
        var cols = pick.slice(3, 6);
        var ok = true, hard = 0, one = 0;
        for (var r = 0; r < 3 && ok; r++) {
          for (var c = 0; c < 3 && ok; c++) {
            var cnt = pairCount(rows[r], cols[c]);   // recuento rápido
            if (cnt < plan.need) { ok = false; break; }
            if (cnt <= plan.hardMin) hard++;
            if (cnt === 1) one++;
          }
        }
        if (ok && hard >= plan.hardCells && one >= plan.ones) {
          // solo ahora construimos las soluciones completas (nombres)
          var sol = [[], [], []];
          for (var rr = 0; rr < 3; rr++) for (var cc = 0; cc < 3; cc++) sol[rr][cc] = solvers(rows[rr], cols[cc]);
          return {
            rows: rows.map(catPublic),
            cols: cols.map(catPublic),
            rowIds: rows.map(function (x) { return x.id; }),
            colIds: cols.map(function (x) { return x.id; }),
            solutions: sol,
            difficulty: difficulty
          };
        }
      }
    }
    return null; // no debería ocurrir
  }

  function catPublic(c) { return { id: c.id, label: c.label, type: c.type }; }

  /* ---------- Validación de una respuesta ---------- */
  // Devuelve { ok, player } — busca cualquier jugador que coincida con el texto
  // y que además satisfaga ambas categorías de la celda.
  function validateGuess(text, rowCatId, colCatId, usedNames) {
    var q = normalize(text);
    if (!q) return { ok: false, reason: 'empty' };
    var rc = CAT_BY_ID[rowCatId], cc = CAT_BY_ID[colCatId];
    var matches = P.filter(function (p) { return p._keys[q]; });
    if (matches.length === 0) {
      // intento por "empieza por" para tolerar autocompletado parcial del apellido
      matches = P.filter(function (p) {
        return Object.keys(p._keys).some(function (k) { return k === q; });
      });
    }
    if (matches.length === 0) return { ok: false, reason: 'unknown' };

    var used = usedNames || {};
    // ¿alguno satisface ambas categorías y no está usado?
    var valid = matches.filter(function (p) { return rc.test(p) && cc.test(p) && !used[p.n]; });
    if (valid.length > 0) return { ok: true, player: valid[0].n };

    // coincide un jugador pero no cumple
    var already = matches.filter(function (p) { return used[p.n]; });
    if (already.length && already.length === matches.length) {
      return { ok: false, reason: 'used', player: already[0].n };
    }
    return { ok: false, reason: 'wrong', player: matches[0].n };
  }

  // Sugerencias de autocompletado (nombres completos que coinciden con el prefijo)
  function suggest(text, limit) {
    var q = normalize(text);
    if (!q) return [];
    var starts = [], contains = [];
    P.forEach(function (p) {
      var nn = normalize(p.n);
      var toks = nn.split(' ');
      var last = toks[toks.length - 1];
      if (nn.indexOf(q) === 0 || last.indexOf(q) === 0 || (p._keys[q])) starts.push(p.n);
      else if (nn.indexOf(q) >= 0) contains.push(p.n);
    });
    return starts.concat(contains).slice(0, limit || 8);
  }

  /* ---------- Tic-tac-toe ---------- */
  var LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  function checkWinner(board) {
    for (var i = 0; i < LINES.length; i++) {
      var l = LINES[i];
      if (board[l[0]] && board[l[0]] === board[l[1]] && board[l[1]] === board[l[2]]) {
        return { winner: board[l[0]], line: l };
      }
    }
    for (var k = 0; k < 9; k++) if (!board[k]) return null;
    return { winner: 'draw', line: null };
  }

  /* ---------- IA de selección de celda ---------- */
  function emptyCells(board) {
    var e = [];
    for (var i = 0; i < 9; i++) if (!board[i]) e.push(i);
    return e;
  }

  // Minimax con poda alfa-beta (misma jugada óptima, casi instantáneo)
  function minimax(board, me, cur, depth, alpha, beta) {
    var res = checkWinner(board);
    if (res) {
      if (res.winner === me) return { score: 10 - depth };
      if (res.winner === 'draw') return { score: 0 };
      return { score: depth - 10 };
    }
    var empties = emptyCells(board);
    var best = null;
    var maximizing = (cur === me);
    for (var i = 0; i < empties.length; i++) {
      var idx = empties[i];
      board[idx] = cur;
      var sub = minimax(board, me, cur === 'X' ? 'O' : 'X', depth + 1, alpha, beta);
      board[idx] = '';
      var s = sub.score;
      if (best === null || (maximizing ? s > best.score : s < best.score)) {
        best = { score: s, idx: idx };
      }
      if (maximizing) { if (s > alpha) alpha = s; }
      else { if (s < beta) beta = s; }
      if (beta <= alpha) break; // poda
    }
    return best;
  }

  // Elige celda para la IA. mark = ficha de la IA, opp = rival
  function aiChooseCell(board, mark, level) {
    var empties = emptyCells(board);
    if (empties.length === 0) return -1;
    var opp = mark === 'X' ? 'O' : 'X';

    function winningMove(who) {
      for (var i = 0; i < empties.length; i++) {
        var b = board.slice();
        b[empties[i]] = who;
        var r = checkWinner(b);
        if (r && r.winner === who) return empties[i];
      }
      return -1;
    }

    if (level === 'random') {
      // a veces gana si es obvio, si no aleatorio
      if (Math.random() < 0.25) { var w0 = winningMove(mark); if (w0 >= 0) return w0; }
      return empties[Math.floor(Math.random() * empties.length)];
    }
    if (level === 'greedy') {
      var w = winningMove(mark); if (w >= 0) return w;
      if (Math.random() < 0.85) { var bl = winningMove(opp); if (bl >= 0) return bl; }
      // centro, esquinas, resto
      return preferCells(empties);
    }
    if (level === 'hard') {
      var w2 = winningMove(mark); if (w2 >= 0) return w2;
      var bl2 = winningMove(opp); if (bl2 >= 0) return bl2;
      if (Math.random() < 0.9) return minimaxCell(board, mark);
      return preferCells(empties);
    }
    // perfect
    return minimaxCell(board, mark);
  }

  function preferCells(empties) {
    var order = [4, 0, 2, 6, 8, 1, 3, 5, 7];
    for (var i = 0; i < order.length; i++) if (empties.indexOf(order[i]) >= 0) return order[i];
    return empties[0];
  }

  function minimaxCell(board, mark) {
    var b = board.slice();
    var best = minimax(b, mark, mark, 0, -Infinity, Infinity);
    return (best && best.idx != null) ? best.idx : preferCells(emptyCells(board));
  }

  /* ============================================================
     LÓGICA DE SALA ONLINE (funciones puras, reutilizadas por el
     multijugador de Firebase). "room" es el estado compartido.
     ============================================================ */
  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function onlineSolutions(room) {
    var sol = [[], [], []];
    for (var r = 0; r < 3; r++) for (var c = 0; c < 3; c++) {
      sol[r][c] = solvers(CAT_BY_ID[room.rowIds[r]], CAT_BY_ID[room.colIds[c]]);
    }
    return sol;
  }
  function usedMap(room) { return room.used || {}; }
  function cellHasAnswer(sol, used, idx) {
    return sol[Math.floor(idx / 3)][idx % 3].some(function (n) { return !used[n]; });
  }
  function anyMoveLeftRoom(room, sol) {
    var used = usedMap(room);
    for (var i = 0; i < 9; i++) if (!room.board[i] && cellHasAnswer(sol, used, i)) return true;
    return false;
  }
  function resolveByCountBoard(board) {
    var res = checkWinner(board);
    if (res) return res;
    var x = 0, o = 0;
    board.forEach(function (m) { if (m === 'X') x++; else if (m === 'O') o++; });
    if (x > o) return { winner: 'X', byCount: true };
    if (o > x) return { winner: 'O', byCount: true };
    return { winner: 'draw' };
  }
  function emptyBoard() { return ['', '', '', '', '', '', '', '', '']; }

  // Crea el estado inicial de una partida online (host = X, invitado = O)
  function onlineNewRoom(opts) {
    var g = generateGrid(opts.level);
    return {
      level: opts.level,
      bestOf: !!opts.bestOf,
      seconds: opts.seconds || 0,           // 0 = sin límite
      rowIds: g.rowIds, colIds: g.colIds,
      board: emptyBoard(),
      cellPlayer: emptyBoard(),
      used: {},
      turn: 'X',
      startMark: 'X',                       // quién saca esta ronda (alterna por ronda)
      scores: { X: 0, O: 0 },
      status: 'playing',
      winner: null, line: null, byCount: false,
      round: 1, matchOver: false,
      moveSeq: 0
    };
  }

  function finalizeRoom(room, res) {
    room.status = 'ended';
    room.byCount = !!res.byCount;
    if (res.winner === 'draw') {
      room.winner = 'draw'; room.line = null;
      room.matchOver = !room.bestOf;
    } else {
      room.winner = res.winner; room.line = res.line || null;
      room.scores[res.winner] = (room.scores[res.winner] || 0) + 1;
      room.matchOver = !room.bestOf || room.scores[res.winner] >= 2;
    }
    return room;
  }

  // Aplica una jugada válida (colocar ficha). mv = { idx, mark, player }
  function onlineApplyMove(room, mv) {
    var r = clone(room);
    r.board[mv.idx] = mv.mark;
    r.cellPlayer[mv.idx] = mv.player;
    r.used = r.used || {};
    r.used[mv.player] = true;
    r.moveSeq = (room.moveSeq || 0) + 1;
    var res = checkWinner(r.board);
    if (res) return finalizeRoom(r, res.winner === 'draw' ? { winner: 'draw' } : res);
    if (!anyMoveLeftRoom(r, onlineSolutions(r))) return finalizeRoom(r, resolveByCountBoard(r.board));
    r.turn = mv.mark === 'X' ? 'O' : 'X';
    return r;
  }

  // Cede el turno (fallo, rendición o tiempo agotado). mv = { mark }
  function onlineApplyPass(room, mv) {
    var r = clone(room);
    r.moveSeq = (room.moveSeq || 0) + 1;
    if (!anyMoveLeftRoom(r, onlineSolutions(r))) return finalizeRoom(r, resolveByCountBoard(r.board));
    r.turn = mv.mark === 'X' ? 'O' : 'X';
    return r;
  }

  // Serialización segura para Realtime Database (evita arrays con huecos/null)
  function onlineEncode(r) {
    var players = {};
    r.cellPlayer.forEach(function (n, i) { if (n) players[String(i)] = n; });
    return {
      level: r.level, bestOf: !!r.bestOf, seconds: r.seconds || 0,
      rowIds: r.rowIds, colIds: r.colIds,
      board: r.board.map(function (m) { return m || '-'; }).join(''),
      players: players, used: r.used || {},
      turn: r.turn, startMark: r.startMark || 'X', scores: r.scores, status: r.status,
      winner: r.winner || null, line: r.line || null, byCount: !!r.byCount,
      round: r.round || 1, matchOver: !!r.matchOver, moveSeq: r.moveSeq || 0
    };
  }
  function onlineDecode(g) {
    g = g || {};
    var board = (g.board || '---------').split('').map(function (c) { return c === '-' ? '' : c; });
    while (board.length < 9) board.push('');
    var players = g.players || {}, cellPlayer = [];
    for (var i = 0; i < 9; i++) cellPlayer[i] = players[String(i)] || '';
    return {
      level: g.level || 'facil', bestOf: !!g.bestOf, seconds: g.seconds || 0,
      rowIds: g.rowIds || [], colIds: g.colIds || [],
      board: board, cellPlayer: cellPlayer, used: g.used || {},
      turn: g.turn || 'X', startMark: g.startMark || 'X',
      scores: g.scores || { X: 0, O: 0 }, status: g.status || 'playing',
      winner: g.winner || null, line: g.line || null, byCount: !!g.byCount,
      round: g.round || 1, matchOver: !!g.matchOver, moveSeq: g.moveSeq || 0
    };
  }

  // Siguiente ronda (mantiene marcador) o nueva serie si la anterior cerró la serie.
  // El saque ALTERNA cada ronda: si esta ronda sacó X, la siguiente saca O,
  // gane quien gane (más justo: quien empieza tiene ventaja en el 3 en raya).
  function onlineNextRound(room) {
    var r = clone(room);
    if (r.matchOver) r.scores = { X: 0, O: 0 };
    var g = generateGrid(r.level);
    r.rowIds = g.rowIds; r.colIds = g.colIds;
    r.board = emptyBoard(); r.cellPlayer = emptyBoard();
    r.used = {};
    r.startMark = (room.startMark === 'O') ? 'X' : 'O';
    r.turn = r.startMark;
    r.status = 'playing';
    r.winner = null; r.line = null; r.byCount = false; r.matchOver = false;
    r.round = r.scores.X + r.scores.O + 1;
    r.moveSeq = (room.moveSeq || 0) + 1;
    return r;
  }

  var API = {
    players: P,
    categories: CATS,
    normalize: normalize,
    generateGrid: generateGrid,
    validateGuess: validateGuess,
    suggest: suggest,
    checkWinner: checkWinner,
    aiChooseCell: aiChooseCell,
    solvers: solvers,
    DIFF: DIFF,
    catById: function (id) { return CAT_BY_ID[id]; },
    // online
    onlineNewRoom: onlineNewRoom,
    onlineApplyMove: onlineApplyMove,
    onlineApplyPass: onlineApplyPass,
    onlineNextRound: onlineNextRound,
    onlineEncode: onlineEncode,
    onlineDecode: onlineDecode,
    onlineSolutions: onlineSolutions,
    onlineCellHasAnswer: function (room, idx) { return cellHasAnswer(onlineSolutions(room), usedMap(room), idx); },
    onlineAnyMoveLeft: function (room) { return anyMoveLeftRoom(room, onlineSolutions(room)); }
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  root.FGC = API;
})(typeof globalThis !== 'undefined' ? globalThis : this);
