Feature: Operation for rooms
    Run operation on rooms

    Scenario: Create a room
        When I POST "/rooms" with
        """
            {
                "name": "Pepsi",
                "description": "History of Coca 2"
            }
        """
        Then response status is "201"
        
    Scenario: Get rooms
        When I GET "/rooms"
        Then response status is "200"

    Scenario: Create a wrong room
        When I POST "/rooms" with
        """
            {
                "description": "History of Coca 2"
            }
        """
        Then response status is "400"

    Scenario: Delete a room
        Given I have a room named "coca"
        When I DELETE "/rooms/:id"
        Then response status is "200"