import re
import pytest
from playwright.sync_api import Playwright, Page, expect

    
def test_google_ducks_search(page: Page) -> None:
    # Go to google and assert correct page
    page.goto("/")
    assert page.title() == "Google"

    # Search for "Ducks"
    page.locator('#APjFqb').fill('ducks')
    page.keyboard.press("Enter")

    # Check responses
    page.on("response", lambda response: print("<<", response.url, response.status))

    # Verify search bar contains the word "ducks"
    expect(page.locator('#APjFqb')).to_have_value('ducks')

    # Check that search results on loaded page reference "ducks"
    page.get_by_role('link').nth(4).wait_for()
    titles = page.get_by_role('link').all_text_contents()
    matches = [t for t in titles if 'ducks' in t.lower()]
    assert len(matches) > 0

    # Check that URL contains updated search reference (so not just google.com)
    expect(page).to_have_url(re.compile(".*search"))
    print(page.url)
     
   
    # Search result title includes what you're searching
    assert page.title() == "ducks - Google Search"
    expect(page).to_have_title('ducks - Google Search')



    
 