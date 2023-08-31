import re
import pytest
from playwright.sync_api import Playwright, Page, expect

    
def test_google_ducks_search(page: Page) -> None:
    # Go to google and assert correct page
    page.goto("/")
    assert page.title() == "Google"

    # Fill search word ("ducks") and hit 'Enter'
    with page.expect_response("*/complete/search?q=ducks*") as response_info:
        page.locator('#APjFqb').fill('ducks')
        page.keyboard.press("Enter")

    # Check response URL - "/complete/search?q=ducks*"
    response = response_info.value
    assert response.ok and response.status == 200
    print(response)

    # Verify search field on loaded page contains the word "ducks"
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

    # Can click on a search result and it takes you to new page (which also checks content on page)
    page.get_by_text("Duck - Wikipedia").click()
    expect(page).to_have_url(re.compile(".*wikipedia"))
    assert page.title() == "Duck - Wikipedia"

    # Expanding on this test (and steps), I'd want to check full responses yielded from search results

   



    
 