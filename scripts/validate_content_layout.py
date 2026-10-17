#!/usr/bin/env python3
"""Static regression checks for the seven-page public content layout package."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys

ROOT = Path(__file__).resolve().parents[1]
PAGES = (
    "pages/about.html",
    "pages/contact.html",
    "pages/privacy.html",
    "pages/terms.html",
    "pages/search.html",
    "pages/guides/index.html",
    "pages/guides/travel-updates.html",
)

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.attrs = []
        self.tags = []
        self.ids = {}
        self.main_open = 0
        self.main_close = 0
        self.h1 = 0
        self.main_attrs = []
        self.skip_links = []
        self.descriptions = []
        self.stylesheets = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append(tag)
        self.attrs.append((tag, attrs))
        if attrs.get("id"):
            self.ids[attrs["id"]] = attrs
        if tag == "main":
            self.main_open += 1
            self.main_attrs.append(attrs)
        if tag == "h1":
            self.h1 += 1
        if tag == "a" and "skip-link" in attrs.get("class", "").split():
            self.skip_links.append(attrs.get("href", ""))
        if tag == "meta" and attrs.get("name", "").lower() == "description":
            self.descriptions.append(attrs.get("content", ""))
        if tag == "link" and "stylesheet" in attrs.get("rel", "").lower().split():
            self.stylesheets.append(attrs.get("href", ""))

    def handle_endtag(self, tag):
        if tag == "main":
            self.main_close += 1

def fail(errors, message):
    errors.append(message)

def main():
    errors = []
    checked_refs = 0
    for relative in PAGES:
        page = ROOT / relative
        if not page.is_file():
            fail(errors, f"{relative}: page file is missing")
            continue
        parser = PageParser()
        parser.feed(page.read_text(encoding="utf-8"))
        parser.close()

        if parser.h1 != 1:
            fail(errors, f"{relative}: expected exactly one H1, found {parser.h1}")
        if parser.main_open != 1 or parser.main_close != 1:
            fail(errors, f"{relative}: expected one balanced main landmark; open={parser.main_open}, close={parser.main_close}")
        if len(parser.skip_links) != 1 or parser.skip_links[0] != "#mainContent":
            fail(errors, f"{relative}: expected one Skip to content link targeting #mainContent")
        main_attrs = parser.main_attrs[0] if len(parser.main_attrs) == 1 else {}
        if main_attrs.get("id") != "mainContent" or main_attrs.get("tabindex") != "-1":
            fail(errors, f"{relative}: main landmark must use id=mainContent and tabindex=-1")
        ids = [attrs.get("id") for _, attrs in parser.attrs if attrs.get("id")]
        for required_id in ("mainNav", "menuToggle"):
            if ids.count(required_id) != 1:
                fail(errors, f"{relative}: expected exactly one #{required_id}, found {ids.count(required_id)}")
        if not any(href and href.endswith("content-layout.css") for href in parser.stylesheets):
            fail(errors, f"{relative}: shared content-layout.css stylesheet not found")
        if not any(len(description.strip()) >= 30 for description in parser.descriptions):
            fail(errors, f"{relative}: meaningful meta description (30+ characters) missing")

        for tag, attrs in parser.attrs:
            for attr in ("href", "src"):
                raw = attrs.get(attr, "")
                if not raw:
                    continue
                parts = urlsplit(raw)
                if parts.scheme or parts.netloc or raw.startswith("#"):
                    continue
                path = unquote(parts.path)
                if not path:
                    continue
                target = (page.parent / path).resolve() if not path.startswith("/") else (ROOT / path.lstrip("/")).resolve()
                try:
                    target.relative_to(ROOT.resolve())
                except ValueError:
                    fail(errors, f"{relative}: {attr} escapes repository root: {raw}")
                    continue
                if target.is_dir():
                    target = target / "index.html"
                checked_refs += 1
                if not target.is_file():
                    fail(errors, f"{relative}: missing local {attr} target {raw} -> {target.relative_to(ROOT.resolve())}")

    if errors:
        print("Content layout validation FAILED:")
        for error in errors:
            print(f" - {error}")
        print(f"Checked {checked_refs} local href/src references.")
        return 1
    print(f"Content layout validation passed: {len(PAGES)} pages and {checked_refs} local href/src references.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
