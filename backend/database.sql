CREATE TABLE `mots` (
  `id` int(11) NOT NULL,
  `word` varchar(255) NOT NULL,
  `longueur` int(11) NOT NULL,
  `difficulté` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `numero_secu` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `users` (`id`, `pseudo`, `password`, `numero_secu`) VALUES
(2, 'massi', '$2b$10$PiaeaWEOd2hYDVxJo/Q0/.Cd4xg80tLH22siWvWYAoiv7Lo/FYOEe', '1234'),
(3, 'youva', '$2b$10$bUB1jqYfYz9kYK6wIq2kf.fEFx9lm0QFN894JZM8zWWvpXdHDssl6', '1234'),
(5, 'moh', '$2b$10$cW6TArexRi9derFYSmJHZ.PfjDekgy.tFsXzFuTqBDCBfSMG7IHbW', '1234');



CREATE TABLE `walloffame` (
  `id` int(11) NOT NULL,
  `scores` int(11) NOT NULL,
  `login` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `walloffame` (`id`, `scores`, `login`) VALUES
(1, 207, 'massi'),
(2, 97, 'youva');


ALTER TABLE `mots`
  ADD PRIMARY KEY (`id`);


--
-- Index pour la table `walloffame`
--
ALTER TABLE `walloffame`
  ADD PRIMARY KEY (`id`),
  ADD KEY `login` (`login`);


--
-- AUTO_INCREMENT pour la table `mots`
--
ALTER TABLE `mots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `walloffame`
--
ALTER TABLE `walloffame`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour la table `walloffame`
--
ALTER TABLE `walloffame`
  ADD CONSTRAINT `walloffame_ibfk_1` FOREIGN KEY (`login`) REFERENCES `users` (`pseudo`) ON DELETE CASCADE ON UPDATE CASCADE;
