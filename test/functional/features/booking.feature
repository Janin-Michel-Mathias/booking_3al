Feature: operation for bookings
    Run operation on bookings

    Scenario: Get bookings
        When I GET "/bookings"
        Then response status is "200"

    Scenario: Create a bookings
        Given I have a room named "coca" and a user named "fanOfCoca"
        When I POST "/bookings" with
        """
            {
                "startTime": "2020-07-10 15:00:00.000",
                "endTime": "2020-07-10 17:00:00.000",
                "room": ":roomId",
                "description": "reservation",
                "title": "reservation",
                "userId": ":userId"
            }
        """
        Then response status is "201"

    Scenario: Create a wrong booking
        Given I have a room named "coca" and a user named "fanOfCoca"
        When I POST "/bookings" with
        """
            {
                "startTime": "2020-07-10 15:00:00.000",
                "endTime": "2020-07-10 17:00:00.000",
                "room": ":roomId",
                "description": "reservation",
                "userId": ":userId"
            }
        """
        Then response status is "400"
    
    Scenario: Delete a booking
        Given I have a room named "coca", a user named "fanOfCoca" and a booking named "cocaReservation"
        When I DELETE "/bookings/:id"
        Then response status is "200"