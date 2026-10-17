#!/usr/bin/env python3
"""Small standard-library checks for the new single-page homepage."""
from html.parser import HTMLParser
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "index.html"

class Check(HTMLParser):
    def __init__(self):
        super().__init__()
        self.h1 = 0
        self.main_open = 0
        self.main_close = 0
        self.ids = []
        self.links = []
        self.images_without_alt = 0
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "h1": self.h1 += 1
        if tag == "main": self.main_open += 1
        if attrs.get("id"): self.ids.append(attrs["id"])
        if tag == "a" and attrs.get("href"): self.links.append(attrs["href"])
        if tag == "img" and "alt" not in attrs: self.images_without_alt += 1
    def handle_endtag(self, tag):
        if tag == "main": self.main_close += 1

def main():
    if not PAGE.is_file():
        print("FAIL: index.html is missing")
        return 1
    parser = Check()
    parser.feed(PAGE.read_text(encoding="utf-8"))
    errors = []
    if parser.h1 != 1: errors.append(f"expected exactly one H1, found {parser.h1}")
    if parser.main_open != 1 or parser.main_close != 1:
        errors.append(f"expected one balanced main landmark, got open={parser.main_open}, close={parser.main_close}")
    if parser.images_without_alt: errors.append(f"{parser.images_without_alt} image tags missing alt")
    if len(parser.ids) != len(set(parser.ids)): errors.append("duplicate id attributes found")
    if errors:
        for error in errors: print("FAIL:", error)
        return 1
    print(f"PASS: homepage structure checked; {len(parser.links)} links found")
    return 0

if __name__ == "__main__":
    sys.exit(main())
