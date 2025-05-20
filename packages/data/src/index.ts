export interface Document {
  id: string;
  content: string;
  title?: string;
  createdAt: number;
}

export { importDocsFromDir } from './importDocs.js';

export function saveDoc(doc: Document): void {
  const docs = getDocs();
  docs.push(doc);
  localStorage.setItem('documents', JSON.stringify(docs));
}

export function getDocs(): Document[] {
  const data = localStorage.getItem('documents');
  if (!data) return [];
  try {
    return JSON.parse(data) as Document[];
  } catch {
    return [];
  }
}

export function deleteDoc(id: string): void {
  const docs = getDocs().filter((d) => d.id !== id);
  localStorage.setItem('documents', JSON.stringify(docs));
}

export function searchDocs(query: string): Document[] {
  const docs = getDocs();
  return docs.filter((d) =>
    (d.title && d.title.includes(query)) || d.content.includes(query)
  );
}