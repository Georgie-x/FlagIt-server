const fetchHighScores = async (name, score, time) => {
	
	const validTopic = ["mitch", "cats", "cooking", "coding", "football"]
	const validAuthor = ["butter_bridge", "lurker", "icellusedkars", "rogersop"]
	const validSortBy = [
		"author",
		"title",
		"article_id",
		"topic",
		"formatted_created_at",
		"votes",
		"article_img_url",
		"comment_count",
	]
	const validOrder = ["ASC", "DESC"]

	if (topic && !validTopic.includes(topic)) {
		return Promise.reject({ status: 404, message: "topic not found" })
	}
	if (author && !validAuthor.includes(author)) {
		return Promise.reject({ status: 404, message: "author not found" })
	}
	if (order && !validOrder.includes(order)) {
		return Promise.reject({ status: 400, message: "order should be DESC or ASC" })
	}
	if (sortby && !validSortBy.includes(sortby)) {
		return Promise.reject({ status: 404, message: "sortby not found" })
	}
	if (limit && isNaN(limit)) {
		return Promise.reject({ status: 400, message: "page limit should be a number" })
	}
	if (p && isNaN(p)) {
		return Promise.reject({ status: 400, message: "page should be a number" })
	}

	sortby = sortby || `formatted_created_at`
	order = order || `DESC`
	limit = Number(limit) || 10
	p = p || 1
	
	let query = `SELECT articles.author, articles.title, articles.article_id, articles.topic, to_char(articles.created_at, 'YYYY-MM-DD HH24:MI:SS') AS formatted_created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)::int AS comment_count, COUNT(articles.article_id)::int AS total_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id`

	const values = []

	if (topic) {
		query += ` WHERE articles.topic = $${values.length + 1}`
		values.push(topic)
	}
	if (author) {
		query += ` WHERE articles.author = $${values.length + 1}`
		values.push(author)
	}

	query += ` GROUP BY articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url ORDER BY ${sortby} ${order}`

	query += ` LIMIT $${values.length + 1}`
	values.push(limit)

	query += ` OFFSET $${values.length + 1}`
	values.push((p - 1) * limit)
	
	const body = await db.query(query, values)
	console.log(body.rows)
	if (body.rows.length === 0) {
		return Promise.reject({ status: 404, message: "no articles found" })
	} else {
		return body.rows
	}
}