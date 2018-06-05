class SetRandom
  
  class << self
    def get_random_values(count)
      result = []
      count.times do
        result.push(format("%.3f", rand(0...1.0)))
      end
      return result
    end
    
    def get_value_from_to
      result = []
      1.upto(10) do |i|
        hash = Hash.new
        hash[:from] = format("%.1f", (i.to_f - 1) / 10)
        hash[:to] = format("%.1f", i.to_f / 10)
        result.push(hash)
      end
      result
    end
  end
end