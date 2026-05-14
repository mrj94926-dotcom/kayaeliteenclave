import fs from 'fs';
import path from 'path';

let blocklist: Set<string> | null = null;

function loadBlocklist() {
  if (blocklist) return blocklist;
  
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'disposable_email_blocklist.conf');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // Split by newlines, trim, and remove empty lines
    const domains = fileContent
      .split(/\r?\n/)
      .map(line => line.trim().toLowerCase())
      .filter(line => line.length > 0 && !line.startsWith('#'));
      
    blocklist = new Set(domains);
    return blocklist;
  } catch (error) {
    console.error('Failed to load email blocklist:', error);
    // Return empty set to fail open (allow emails) if the file can't be read
    return new Set<string>();
  }
}

export function isDisposableEmail(email: string): boolean {
  if (!email || !email.includes('@')) return true;
  
  const domain = email.split('@')[1].toLowerCase().trim();
  const list = loadBlocklist();
  
  return list.has(domain);
}
