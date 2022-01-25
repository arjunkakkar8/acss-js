library(tidyverse)

test <- acss_data %>% head(100)
acss_data_truncated <- acss_data[nchar(rownames(acss_data)) < 8, ]

rda_to_json <- function(data, name="acss_data") {
  data %>% apply(1, function(row, i) {
    paste0('["', paste(sprintf('%.2f', row), collapse='","'), '"]')
  }) %>%
    Map(paste, paste0('"', names(.), '"'), ., sep=":") %>% 
    paste(collapse = ',') %>% 
    paste0('{', ., '}') %>% 
    write(file = paste0(name, ".json"))
}


rda_to_json(test, "test")
rda_to_json(acss_data_truncated, "acss_data_truncated")
rda_to_json(acss_data, "acss_data")



normalize_string <- function(string){
  splitted <- strsplit(string, "")
  elements <- lapply(splitted, unique)
  if (any(vapply(elements, length, 0)>10)) stop("two many symbols (more than 10)")
  exchanged <- mapply(function(x, y) seq(0, length.out = length(x))[match(y, x)], elements, splitted, SIMPLIFY=FALSE)  
  #data.frame(string = vapply(exchanged, paste, "", collapse = ""), symbols = vapply(exchanged, max, 0)+1, stringsAsFactors = FALSE)
  vapply(exchanged, paste, "", collapse = "")
}



