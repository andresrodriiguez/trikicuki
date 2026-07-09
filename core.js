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
    { n: 'Ronaldo Nazário', nat: 'Brasil', cl: ['Barcelona', 'Inter', 'Real Madrid', 'AC Milan'], wc: 1, ucl: 0, bdo: 1, pos: 'DEL' },
    { n: 'Kaká', nat: 'Brasil', cl: ['AC Milan', 'Real Madrid'], wc: 1, ucl: 1, bdo: 1, pos: 'MED' },
    { n: 'Rivaldo', nat: 'Brasil', cl: ['Barcelona', 'AC Milan'], wc: 1, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Neymar', nat: 'Brasil', cl: ['Santos', 'Barcelona', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Cafú', nat: 'Brasil', cl: ['Roma', 'AC Milan'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Roberto Carlos', nat: 'Brasil', cl: ['Inter', 'Real Madrid'], wc: 1, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Dida', nat: 'Brasil', cl: ['AC Milan'], wc: 1, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Thiago Silva', nat: 'Brasil', cl: ['AC Milan', 'PSG', 'Chelsea'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Marcelo', nat: 'Brasil', cl: ['Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Casemiro', nat: 'Brasil', cl: ['Real Madrid', 'Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Alisson', nat: 'Brasil', cl: ['Roma', 'Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Ederson', nat: 'Brasil', cl: ['Benfica', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Dani Alves', nat: 'Brasil', cl: ['Sevilla', 'Barcelona', 'Juventus', 'PSG'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Vinícius Júnior', nat: 'Brasil', cl: ['Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },

    // --- Francia ---
    { n: 'Zinedine Zidane', nat: 'Francia', cl: ['Juventus', 'Real Madrid'], wc: 1, ucl: 1, bdo: 1, pos: 'MED' },
    { n: 'Thierry Henry', nat: 'Francia', cl: ['Monaco', 'Arsenal', 'Barcelona'], wc: 1, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Kylian Mbappé', nat: 'Francia', cl: ['Monaco', 'PSG', 'Real Madrid'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Antoine Griezmann', nat: 'Francia', cl: ['Real Sociedad', 'Atlético Madrid', 'Barcelona'], wc: 1, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Paul Pogba', nat: 'Francia', cl: ['Juventus', 'Manchester United'], wc: 1, ucl: 0, bdo: 0, pos: 'MED' },
    { n: "N'Golo Kanté", nat: 'Francia', cl: ['Leicester', 'Chelsea'], wc: 1, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Karim Benzema', nat: 'Francia', cl: ['Lyon', 'Real Madrid'], wc: 0, ucl: 1, bdo: 1, pos: 'DEL' },
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
    { n: 'Cristiano Ronaldo', nat: 'Portugal', cl: ['Sporting', 'Manchester United', 'Real Madrid', 'Juventus'], wc: 0, ucl: 1, bdo: 1, pos: 'DEL' },
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
    { n: 'Erling Haaland', nat: 'Noruega', cl: ['Borussia Dortmund', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Zlatan Ibrahimović', nat: 'Suecia', cl: ['Ajax', 'Juventus', 'Inter', 'Barcelona', 'AC Milan', 'PSG', 'Manchester United', 'LA Galaxy'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Kevin De Bruyne', nat: 'Bélgica', cl: ['Chelsea', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Thibaut Courtois', nat: 'Bélgica', cl: ['Atlético Madrid', 'Chelsea', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Eden Hazard', nat: 'Bélgica', cl: ['Lille', 'Chelsea', 'Real Madrid'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
    { n: 'Luka Modrić', nat: 'Croacia', cl: ['Tottenham', 'Real Madrid'], wc: 0, ucl: 1, bdo: 1, pos: 'MED' },
    { n: 'Ivan Rakitić', nat: 'Croacia', cl: ['Sevilla', 'Barcelona'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'Mario Mandžukić', nat: 'Croacia', cl: ['Bayern Munich', 'Atlético Madrid', 'Juventus'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Mohamed Salah', nat: 'Egipto', cl: ['Chelsea', 'Roma', 'Liverpool'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Sadio Mané', nat: 'Senegal', cl: ['Southampton', 'Liverpool', 'Bayern Munich'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: "Samuel Eto'o", nat: 'Camerún', cl: ['Real Madrid', 'Mallorca', 'Barcelona', 'Inter', 'Chelsea'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Didier Drogba', nat: 'Costa de Marfil', cl: ['Marseille', 'Chelsea'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Yaya Touré', nat: 'Costa de Marfil', cl: ['Barcelona', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'George Weah', nat: 'Liberia', cl: ['Monaco', 'PSG', 'AC Milan', 'Chelsea'], wc: 0, ucl: 0, bdo: 1, pos: 'DEL' },
    { n: 'Gareth Bale', nat: 'Gales', cl: ['Tottenham', 'Real Madrid'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Ryan Giggs', nat: 'Gales', cl: ['Manchester United'], wc: 0, ucl: 1, bdo: 0, pos: 'MED' },
    { n: 'George Best', nat: 'Irlanda del Norte', cl: ['Manchester United'], wc: 0, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Peter Schmeichel', nat: 'Dinamarca', cl: ['Manchester United', 'Manchester City'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },

    // --- Ampliación: más leyendas y variedad de ligas ---
    { n: 'Andriy Shevchenko', nat: 'Ucrania', cl: ['Dynamo Kyiv', 'AC Milan', 'Chelsea'], wc: 0, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Pavel Nedvěd', nat: 'República Checa', cl: ['Lazio', 'Juventus'], wc: 0, ucl: 0, bdo: 1, pos: 'MED' },
    { n: 'Hristo Stoichkov', nat: 'Bulgaria', cl: ['Barcelona'], wc: 0, ucl: 1, bdo: 1, pos: 'DEL' },
    { n: 'Roberto Baggio', nat: 'Italia', cl: ['Fiorentina', 'Juventus', 'AC Milan', 'Inter'], wc: 0, ucl: 0, bdo: 1, pos: 'DEL' },
    { n: 'Raúl González', nat: 'España', cl: ['Real Madrid', 'Schalke 04'], wc: 0, ucl: 1, bdo: 0, pos: 'DEL' },
    { n: 'Petr Čech', nat: 'República Checa', cl: ['Chelsea', 'Arsenal'], wc: 0, ucl: 1, bdo: 0, pos: 'POR' },
    { n: 'Ashley Cole', nat: 'Inglaterra', cl: ['Arsenal', 'Chelsea'], wc: 0, ucl: 1, bdo: 0, pos: 'DEF' },
    { n: 'Vincent Kompany', nat: 'Bélgica', cl: ['Hamburgo', 'Manchester City'], wc: 0, ucl: 0, bdo: 0, pos: 'DEF' },
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
    { n: 'Robinho', nat: 'Brasil', cl: ['Real Madrid', 'Manchester City', 'AC Milan'], wc: 0, ucl: 0, bdo: 0, pos: 'DEL' },
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
    { n: 'Shinji Kagawa', nat: 'Japón', cl: ['Borussia Dortmund', 'Manchester United'], wc: 0, ucl: 0, bdo: 0, pos: 'MED' }
  ];

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
    'Colombia': 4, 'Chile': 4, 'México': 4, 'Marruecos': 4, 'Senegal': 4
  };
  // Clubes con su tier
  var CLUB_TIER = {
    'Real Madrid': 1, 'Barcelona': 1, 'Manchester United': 1, 'Bayern Munich': 1, 'Juventus': 1, 'Liverpool': 1,
    'Chelsea': 2, 'PSG': 2, 'AC Milan': 2, 'Inter': 2, 'Manchester City': 2, 'Atlético Madrid': 2, 'Arsenal': 2, 'Tottenham': 2,
    'Ajax': 3, 'Monaco': 3, 'Napoli': 3, 'Roma': 3, 'Porto': 3, 'Benfica': 3, 'Borussia Dortmund': 3,
    'Sevilla': 3, 'Valencia': 3, 'Lazio': 3, 'Newcastle': 4, 'Leicester': 4, 'Everton': 4, 'Fiorentina': 4,
    'Sporting': 4, 'PSV': 4
  };
  // Ligas → clubes que pertenecen a cada una
  var LEAGUES = {
    'Jugó en la Premier League': { tier: 1, clubs: ['Manchester United', 'Manchester City', 'Arsenal', 'Chelsea', 'Liverpool', 'Tottenham', 'Aston Villa', 'Brighton', 'Leicester', 'Southampton', 'Everton', 'Leeds', 'West Ham', 'Blackburn', 'Newcastle', 'Fulham'] },
    'Jugó en LaLiga': { tier: 1, clubs: ['Barcelona', 'Real Madrid', 'Atlético Madrid', 'Sevilla', 'Valencia', 'Real Sociedad', 'Villarreal', 'Mallorca', 'Málaga', 'Levante'] },
    'Jugó en la Serie A': { tier: 2, clubs: ['Napoli', 'Juventus', 'Inter', 'AC Milan', 'Fiorentina', 'Roma', 'Lazio', 'Parma', 'Udinese', 'Palermo'] },
    'Jugó en la Bundesliga': { tier: 2, clubs: ['Bayern Munich', 'Borussia Dortmund', 'Schalke 04', 'Werder Bremen', 'Hamburgo', 'Bayer Leverkusen'] },
    'Jugó en la Ligue 1': { tier: 3, clubs: ['PSG', 'Monaco', 'Lyon', 'Marseille', 'Lille'] },
    'Jugó en la Eredivisie': { tier: 3, clubs: ['Ajax', 'PSV', 'Feyenoord'] },
    'Jugó en la Primeira Liga': { tier: 3, clubs: ['Porto', 'Benfica', 'Sporting'] },
    'Jugó en la MLS': { tier: 4, clubs: ['Inter Miami', 'LA Galaxy'] }
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

  /* ---------- Solucionadores ---------- */
  function solvers(rowCat, colCat) {
    var out = [];
    for (var i = 0; i < P.length; i++) {
      if (rowCat.test(P[i]) && colCat.test(P[i])) out.push(P[i].n);
    }
    return out;
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
    facil:    { min: 6, poolTier: 1, hardMin: 99, hardCells: 0, onesCells: 0, ai: 'random',  autocomplete: 'full',    seconds: 60 },
    medio:    { min: 3, poolTier: 2, hardMin: 3,  hardCells: 2, onesCells: 0, ai: 'greedy',  autocomplete: 'full',    seconds: 60 },
    dificil:  { min: 2, poolTier: 3, hardMin: 3,  hardCells: 4, onesCells: 0, ai: 'hard',    autocomplete: 'limited', seconds: 60 },
    ultimate: { min: 1, poolTier: 4, hardMin: 2,  hardCells: 6, onesCells: 2, ai: 'perfect', autocomplete: 'none',    seconds: 45 }
  };

  function pool(maxTier) {
    return CATS.filter(function (c) { return c.tier <= maxTier; });
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
        var sol = [[], [], []];
        for (var r = 0; r < 3 && ok; r++) {
          for (var c = 0; c < 3 && ok; c++) {
            var s = solvers(rows[r], cols[c]);
            if (s.length < plan.need) { ok = false; break; }
            if (s.length <= plan.hardMin) hard++;
            if (s.length === 1) one++;
            sol[r][c] = s;
          }
        }
        if (ok && hard >= plan.hardCells && one >= plan.ones) {
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
      if (Math.random() < 0.75) { var bl = winningMove(opp); if (bl >= 0) return bl; }
      // centro, esquinas, resto
      return preferCells(empties);
    }
    if (level === 'hard') {
      var w2 = winningMove(mark); if (w2 >= 0) return w2;
      var bl2 = winningMove(opp); if (bl2 >= 0) return bl2;
      if (Math.random() < 0.7) return minimaxCell(board, mark);
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
      turn: r.turn, scores: r.scores, status: r.status,
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
      turn: g.turn || 'X', scores: g.scores || { X: 0, O: 0 }, status: g.status || 'playing',
      winner: g.winner || null, line: g.line || null, byCount: !!g.byCount,
      round: g.round || 1, matchOver: !!g.matchOver, moveSeq: g.moveSeq || 0
    };
  }

  // Siguiente ronda (mantiene marcador) o nueva serie si la anterior cerró la serie
  function onlineNextRound(room) {
    var r = clone(room);
    if (r.matchOver) r.scores = { X: 0, O: 0 };
    var g = generateGrid(r.level);
    r.rowIds = g.rowIds; r.colIds = g.colIds;
    r.board = emptyBoard(); r.cellPlayer = emptyBoard();
    r.used = {}; r.turn = 'X'; r.status = 'playing';
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
