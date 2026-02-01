<script>
  import { dateMonthShort } from "../helpers/dateTime";
  import { MapPin, DollarSign } from "lucide-svelte";

  let { title, date, earnings, location } = $props();
</script>

<li class="list-item">
  <div class="date-badge">
    {dateMonthShort(date)}
  </div>

  <div class="content">
    <p class="title">{title}</p>
    <div class="location">
      <MapPin size={12} />
      <span>{location}</span>
    </div>
  </div>

  <div class="earnings">
    <span>{earnings}</span>
    <small>€</small>
  </div>
</li>

<style>
  .list-item {
    margin-top: 12px;
    background-color: var(--box-background-color);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 16px;
    transition:
      transform 0.2s,
      background-color 0.2s;
    border: 1px solid rgba(255, 255, 255, 0.03);
  }

  .list-item:hover {
    transform: translateY(-2px);
    background-color: rgba(255, 255, 255, 0.08);
  }

  .date-badge {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--primary-color);
    font-size: 0.8rem;
    font-weight: bold;
    padding: 8px 12px;
    border-radius: 10px;
    text-align: center;
    min-width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow: hidden;
  }

  .title {
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .location {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.8rem;
    opacity: 0.6;
  }

  .earnings {
    font-size: 1.1rem;
    font-weight: bold;
    color: #34d399; /* Soft green/teal */
    display: flex;
    align-items: baseline;
    gap: 2px;
  }

  .earnings small {
    font-size: 0.8rem;
    opacity: 0.8;
    font-weight: normal;
  }
</style>
