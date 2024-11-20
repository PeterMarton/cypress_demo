Feature: Dog site

  Scenario: Site is loaded
    When I go to the main page
    Then The title Dog Shop is displayed

  Scenario Outline: <fieldName> is displayed on Add form
    When I go to the main page
    Then The Add form is displayed
    And <fieldName> text field is displayed
    And <fieldName> has the proper input field naming
    Examples:
      | fieldName |
      | Breed     |
      | Nick      |
      | Price     |
      | Image     |

  Scenario: Empty form can not be submitted
    Given  I go to the main page
    And Add form is not filled
    When I click on Add button
    Then nothing happens

  Scenario Outline: Adding new dog to the page
    Given I go to the main page
    When I fill the Add form with <breed>, <nick>,<price>
    And I click on Add button
    Then new dog has been added and the values(<breed>, <nick>,<price>) are displayed
    Examples:
      | breed     | nick     | price |
      | breedTest | nickTest | 100   |

  Scenario: Remove existing dog from page
    Given I go to the main page
    When I click Delete button
    Then dog has been removed

  Scenario: Remove existing dog from page
    Given I go to the main page
    When I click on edit button
    Then The values can be edited

  Scenario: All images are loaded
    Given I go to the main page
    When I check all the image urls
    Then all images are reachable

