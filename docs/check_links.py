#!/usr/bin/env python3
"""
Link checker for the learning roadmap page
Verifies all internal links are accessible
"""

import requests
from bs4 import BeautifulSoup
import sys
from urllib.parse import urljoin, urlparse
from collections import defaultdict

BASE_URL = "http://localhost:4000"
ROADMAP_URL = f"{BASE_URL}/learning-roadmap/"

def check_links():
    # Get the learning roadmap page
    try:
        response = requests.get(ROADMAP_URL)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Error fetching roadmap page: {e}")
        return 1
    
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find all links
    links = soup.find_all('a', href=True)
    
    # Track results
    total_links = 0
    broken_links = []
    checked_urls = set()
    link_status = defaultdict(list)
    
    print(f"Checking {len(links)} links on the learning roadmap page...\n")
    
    for link in links:
        href = link['href']
        
        # Skip external links and anchors
        if href.startswith(('http://', 'https://')) and not href.startswith(BASE_URL):
            continue
        if href.startswith('#'):
            continue
        if href.startswith('mailto:'):
            continue
            
        # Make URL absolute
        url = urljoin(ROADMAP_URL, href)
        
        # Skip if already checked
        if url in checked_urls:
            continue
            
        checked_urls.add(url)
        total_links += 1
        
        # Check the link
        try:
            resp = requests.get(url, allow_redirects=True)
            status = resp.status_code
            
            if status == 200:
                link_status['working'].append((href, link.get_text(strip=True)))
            else:
                link_status['broken'].append((href, link.get_text(strip=True), status))
                broken_links.append(f"  - {href} ({link.get_text(strip=True)}) - Status: {status}")
                
        except requests.RequestException as e:
            link_status['error'].append((href, link.get_text(strip=True), str(e)))
            broken_links.append(f"  - {href} ({link.get_text(strip=True)}) - Error: {e}")
    
    # Print summary
    print(f"\nLink Check Summary:")
    print(f"==================")
    print(f"Total unique internal links checked: {total_links}")
    print(f"Working links: {len(link_status['working'])}")
    print(f"Broken links: {len(link_status['broken'])}")
    print(f"Errors: {len(link_status['error'])}")
    
    if broken_links:
        print(f"\nBroken links found:")
        for link in broken_links:
            print(link)
        return 1
    else:
        print(f"\n✅ All internal links are working correctly!")
        return 0

if __name__ == "__main__":
    sys.exit(check_links())
