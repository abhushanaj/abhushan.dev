export function formatPublishedDate(date: Date) {
	const formattedDate = new Date(date).toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
	return formattedDate;
}
