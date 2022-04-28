SELECT
	a.total AS interest,
	b.total AS memberClaimed,
	c.total AS teamTotal
FROM
	(
		SELECT
			sum(a.interest) AS total
		FROM
			game_interest a
-- 		WHERE
-- 			a.period <= 165
	) a,
	(
		SELECT
			sum(a.earnings) AS total
		FROM
			member_earnings a
	) b,
	(
		SELECT
			sum(a.earnings) AS total
		FROM
			team_earnings a
-- 		WHERE
-- 			a.period <= 165
	) c
