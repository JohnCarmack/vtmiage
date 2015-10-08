
@found "AAA", ->
  @message "search1", "BBB", ->
    @message "search2", "CCC", ->
      @message "search3", "DDD", -> @reply ""
      @reply "" , "BBB"
    @reply "" , "AAA"
