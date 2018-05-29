class SetRandom

  class << self
    def get_random_values(count)
      result = []
      count.times do
        result.push(format("%.3f", rand(0...1.0)))
      end
      return result
    end
  end
end